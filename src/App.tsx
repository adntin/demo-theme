import * as React from "react";
import "./App.css";

// import logo from "./logo.svg";

// class App extends React.Component {
//   public render() {
//     return (
//       <div className="App">
//         <header className="App-header">
//           <img src={logo} className="App-logo" alt="logo" />
//           <h1 className="App-title">Welcome to React</h1>
//         </header>
//         <p className="App-intro">
//           To get started, edit <code>src/App.tsx</code> and save to reload.
//         </p>
//       </div>
//     );
//   }
// }

interface IProps {}
interface IStates {
  themes: any; // ['dark', 'light']
  element: any; // current link element
}

class App extends React.Component<IProps, IStates> {
  constructor(props: IProps) {
    super(props);
    const theme = localStorage.getItem("theme");
    this.changeTheme(theme);
    this.state = {
      themes: process.env.themes,
      element: null
    };
  }

  public changeTheme = (theme: string | null) => {
    if (!theme) {
      return;
    }
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = `./theme-${theme}.css`;
    document.head.appendChild(link); // insert new theme
    link.onload = () => {
      this.removeTheme(); // remove old theme
      localStorage.setItem("theme", theme);
      this.setState({
        element: link
      }); // set new theme
    };
  };

  public removeTheme = () => {
    const { element } = this.state;
    if (element) {
      element.parentNode.removeChild(element);
    }
  };

  public resetTheme = () => {
    this.removeTheme();
    localStorage.removeItem("theme");
    this.setState({
      element: null
    });
  };

  public render() {
    const { themes } = this.state;
    return (
      <div>
        <h1>Click button change theme</h1>
        <button onClick={this.resetTheme}>default</button>
        {themes.map((theme: string) => (
          <button key={theme} onClick={() => this.changeTheme(theme)}>
            {theme}
          </button>
        ))}
      </div>
    );
  }
}

export default App;
