var path = require('path');

module.exports = {
  entry:[
    path.join(__dirname,"public/js/main.js")
  ],
  output:{
    path:path.join(__dirname,"public/dist"),
    filename:"main.bundle.js"
  }
};