var express = require('express');
var router = express.Router();
var OrderDAO=require("../dao/OrderDAO.js");
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//管理页面 showall
router.get("/showall",function(req,res){
    OrderDAO.findAll(function(data){
      res.send(data);
    });
});

//管理页面,移动端数据 删除
router.post("/del",function(req,res){
  var id=req.body.id;       //商品数据的Id
  OrderDAO.delData(id,function(){
       res.send("删除成功");
  });
});

// 管理页面 状态修改
router.post("/update",function(req,res){
  var id=req.body.id;
  var statu=req.body.statu;
  OrderDAO.upData(id,statu,function(){
       res.send("修改成功");
  });
});

//管理页面 查找
router.post("/search",function(req,res){
  var name=req.body.name;
  var reg=new RegExp(name);
  var searchData=[];
  OrderDAO.findAll(function(data){
    for(var i=0;i<data.length; i++){
      if(reg.test(data[i].userManage.username)){
        searchData.push(data[i]);
      }
    }
    res.send(searchData);
  });
});

//移动端 订单的生成 加入购物车
router.post("/add",function(req,res){
  var d = new Date();
  var nowTime=`${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;
    var id=req.body.id;     //用户的关联Id
    var name=req.body.name;   //商品名
    var time=nowTime;  //订单时间
    var price=req.body.price;  //订单总价价格
    var statu="false";        //订单付款状态
    var size=req.body.size;   //订单规格
    var singleprice=req.body.singleprice;  //订单单价
    var number=req.body.number;   //订单数量
    var img=req.body.img;   //订单图片路径
    OrderDAO.add(id,name,time,price,statu,size,singleprice,number,img,function(){
      res.send("添加成功");
    });
});

//移动端  购物车数据的修改
router.post("/phoneUpdate",function(req,res){
  var id=req.body.id;   // 商品数据Id
  var price=req.body.price;  //订单总价价格
  var number=req.body.number;   //订单数量
  OrderDAO.phoneUpdate(id,price,number,function(){
       res.send("订单修改成功");
  });
});

//移动端 购物车、支付页面数据的返回
router.post("/phoneShowall",function(req,res){
    var id=req.body.id;    //用户Id
  OrderDAO.findAll(function(data){
    var phoneData=[];
    for(var i=0; i<data.length ;i++){
      if(data[i].userManage._id==id&&data[i].statu=="false"){
        phoneData.push(data[i]);
      }
    }
    res.send(phoneData);
  });
});

//移动端 支付页面点确定状态的修改
router.post("/pay",function(req,res){
    var id=req.body.id;   //商品的Id
    var statu="true";
    OrderDAO.upData(id,statu,function(){
         res.send("支付成功");
    });
});


module.exports = router;
