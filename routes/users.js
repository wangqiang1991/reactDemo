var express = require('express');
var router = express.Router();
var UserDao=require("../dao/UserDao.js");
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/login',function(req,res){
    var username = req.body.user;
    var pwd = req.body.pwd;
    UserDao.login(username,pwd,function(data){
        if(data.length > 0){
            req.session.user = data;
            res.send({status:1});

        }else{
            res.send({status:0});
        }
    });
});

module.exports = router;
