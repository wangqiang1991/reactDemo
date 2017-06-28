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
	    { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader', query: { presets: ['es2015','react'] } }
	  ]
  },
  resolve:{
  	alias:{
      "tools":"public/modules/common/tools",
      "store":"public/modules/common/store"
    }
  }
};