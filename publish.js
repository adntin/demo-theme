var ghpages = require("gh-pages");
console.log("Publish...");
ghpages.publish("build", function(err) {
  err && console.log(err);
  !err && console.log("Published");
});
