var path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
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
        { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader', 
        query:{ presets: ['es2015','react'],plugins: [["import",{"libraryName":"antd"}]] } 
      },
      {
        test:/\.css$/, 
        loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader?modules' })
      }
    ]
  },
  devServer: {
          historyApiFallback: true,
          hot: true,
          inline: true,
          proxy: {
            '/api/*': {
              target: 'http://127.0.0.1:3000',
              changeOrigin: true
            }
         }
  },
  plugins: [
     new ExtractTextPlugin("main.bundle.css")
 ],
  resolve:{
    alias:{
      "tools":path.join(__dirname,"public/js/tools.js"),
      "store":path.join(__dirname,"public/js/store.js"),
      "url":path.join(__dirname,"public/js/url.js")
    }
  }
};