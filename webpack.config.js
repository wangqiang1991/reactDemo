var path = require('path');

module.exports = {
  entry:{
    main:'./public/js/main.js'
  },
  output:{
    path:path.join(__dirname,"public/dist"),
    filename:"main.bundle.js"
  },
  module:{
	  	loaders: [
	    { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader', query: { presets: ['es2015','react'],plugins: [["import", { libraryName: "antd"}]] } }
	  ]
  },
  resolve:{
  	alias:{
      "tools":path.join(__dirname,"public/modules/common/tools.js"),
      "store":path.join(__dirname,"public/modules/common/store.js"),
      "url":path.join(__dirname,"public/modules/common/url.js")
    }
  }
  
  
};