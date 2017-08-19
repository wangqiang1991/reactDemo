var express = require('express');
var router = express.Router();

var DataDAO=require("../dao/DataDAO.js");
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

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




module.exports = router;
