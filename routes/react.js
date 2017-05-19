var express = require('express');
var router = express.Router();
var ReactDAO=require("../dao/ReactDAO.js");


router.get("/showall",function(req,res){
    ReactDAO.findAll(function(data){
      res.send(data);
    });
});


//登录
router.post('/login',function(req,res){
    var username = req.body.user;
    var pwd = req.body.pwd;
    ReactDAO.login(username,pwd,function(data){
        if(data.length > 0){
            res.send({status:1});
        }else{
            res.send({status:0});
        }
    });
});



module.exports = router;