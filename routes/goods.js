var express = require('express');
var router = express.Router();
var GoodsDAO = require("../dao/GoodsDAO");
var path = require("path");
var multiparty = require("multiparty");  //把二进制数据转换成一个对象
var fs = require("fs");
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//显示所有
router.get("/showAll",function(req,res){
  var curpage  = req.query.curpage;
  var eachpage = 3;
  var text = req.query.searchText;
  var option={};
  if(text){
    option.name = {$regex:text};
  }
  GoodsDAO.findAll(curpage,eachpage,option,function(data){
    res.send(data);
  });
});

router.get("/showgoodsList",function(req,res){
  var text = req.query.searchText;
  var option={};
  if(text){
    option.name = {$regex:text};
  }
  GoodsDAO.showgoodsList(option,function(data){
    res.send(data);
  });
});
//查询类别
router.get("/showClass",function(req,res){
  GoodsDAO.finClass({},function(data){
    res.send(data);
  });
});
//添加
router.post("/add",function(req,res){
  var name = req.body.name;
  var cid = req.body.cid;
  var price = req.body.price;
  var count = req.body.count;
  var color = req.body.color;
  var size = req.body.size;
  var salenum = req.body.salenum;
  var introtext = req.body.introtext;
  var address = req.body.address;
  var collect = req.body.collect;
  var storeName = req.body.storeName;
  var index_img = req.body.index_img.split(",");
  var detail_img = req.body.detail_img.split(",");
  var intro_img = req.body.intro_img.split(",");
  GoodsDAO.insert(name,cid,price,count,
    color,size,salenum,index_img,
    detail_img,introtext,intro_img,
    address,collect,storeName,function(){
      res.send("添加成功!");
    });
});
//上传
router.post('/upload',function(req,res){
  var form = new multiparty.Form({uploadDir:"./public/images"});
  form.parse(req,function(err,fields,files){
    if(err){
      res.send(err);
    }else {
      var path = files.file[0].path.substring(files.file[0].path.indexOf("images"));
      res.send(path);
    }
  })
});
// 删除
router.post("/delete",function(req,res){
  var id = req.body.id;
  GoodsDAO.remove(id,function () {
    res.send("删除成功");
  });
})
//查询修改时获取的ID
router.post("/edit",function (req,res) {
  var id = req.body.id;
  GoodsDAO.findById(id,function (data) {
    res.send(data[0]);
  });
});
//修改
router.post("/update",function (req,res) {
  var id = req.body._id;
  var cid = req.body.cid;
  var name = req.body.name;
  var price = req.body.price;
  var count = req.body.count;
  var color = req.body.color;
  var size = req.body.size;
  var salenum = req.body.salenum;
  var introtext = req.body.introtext;
  var address = req.body.address;
  var collect = req.body.collect;
  var storeName = req.body.storeName;
  var index_img = req.body.index_img.split(",");
  var detail_img = req.body.detail_img.split(",");
  var intro_img = req.body.intro_img.split(",");
  GoodsDAO.update(id,cid,{name:name,
    price:price,count:count,
    color:color,size:size,salenum:salenum,
    index_img:index_img,
    detail_img:detail_img,introtext:introtext,
    intro_img:intro_img,
    address:address,collect:collect,
    storeName:storeName},function () {
    res.send("修改成功");
  });

});
module.exports = router;
