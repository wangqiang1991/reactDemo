var express = require('express');
var router = express.Router();

var DataDAO=require("../dao/DataDAO.js");
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


//获取所有用户
router.get("/showall",function(req,res){
    DataDAO.findAll(function(data){
      res.send(data);
    });
});

//用户登录
router.post('/login',function(req,res){
    var username = req.body.user;
    var pwd = req.body.pwd;
    DataDAO.loginin(username,pwd,function(data){
        if(data.length > 0){
            req.session.user = data;
            res.send({status:1});
        }else{
            res.send({status:0});
        }
    });
});
//增加用户
router.get('/useradd',function(req,res){
       var username = req.query.username;
       var pwd = req.query.pwd;
       DataDAO.useradd(username,pwd,function(){
            res.send('success')
       })
});

//删除用户
router.get('/deluser',function(req,res){
       var id = req.query.id;
       DataDAO.deluser(id,function(){
            res.send('success')
       })
});

//修改用户
router.post("/upuser",function (req,res) {
  var id = req.body.id;
  var username = req.body.username;
  var pwd = req.body.pwd;
  
  DataDAO.update(id,username,pwd,function () {
    res.send("修改成功");
  });
});
//获取session
router.get('/getSession',function(req,res){
    var user = req.session.user;
    if(user){
        res.send(user);
    }else{
        res.send({});
    }
});
//清空session
router.get('/logout',function(req,res){
    req.session.user = null;
    res.send('注销！');
});





module.exports = router;
