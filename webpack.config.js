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
      {test:/\.css$/,loader:'style!css'},
      {test:/\.js$/,exclude:/node_modules/,loader:'babel',query:{presets:['es2015','React']}}
    ]
  },
  resolve:{
    root:path.join(__dirname,'public'),
    extensions:['','.js'],
    alias:{
      "Index":"modules/index/Index",
      "tools":"modules/commen/tools",
      "store":"modules/commen/store",
      "ShowElement":"modules/mainManage/ShowElement",
      "MainManage":"modules/mainManage/MainManage",
      "OrderManage":"modules/orderManage/OrderManage"
    }
  }
};
