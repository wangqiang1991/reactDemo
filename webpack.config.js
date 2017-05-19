var path = require('path');
module.exports = {
  entry:[
    path.join(__dirname,"public/js/main.js")
  ],
  output:{
    path:path.join(__dirname,"public/dist"),
    filename:"main.bundle.js"
  },
  module:{
    loaders:[
      {test:/\.js$/,exclude:/node_modules/,loader:'babel',query:{presets:['es2015','react']}}
    ]
  },
  resolve:{
    root:path.join(__dirname,'public'),
    extensions:['','.js'],
    alias:{
      "Index":"modules/index/Index",
      "tools":"modules/commen/tools",
      "store":"modules/commen/store",
      "Child1":"modules/index/Child1",
      "Child2":"modules/index/Child2"
    }
  }
};
