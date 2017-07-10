var express = require('express');
var router = express.Router();
var UserDAO = require('../dao/UserDAO');


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
//判断用户名可用
router.get('/vilidata',function(req,res){
	var username = req.query.username;
	UserDAO.findByUserName(username,function(data){
		if(data.length > 0){
			res.send({status:0});
		} else {
			res.send({status:1});
		}
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
//登录
router.post('/login',function(req,res){
    var username = req.body.username;
    var pwd = req.body.pwd;
    UserDAO.findeByUserNameAndPwd(username,pwd,function(data){
        if(data.length > 0){
            req.session.user = data;
            res.send({status:1});
        }else{
            res.send({status:0});
        }
    });
});
//用户注册
router.post('/reg',function(req,res){
    var username = req.body.username;
    var pwd = req.body.pwd;
    UserDAO.insert(username,pwd,function(){
        res.send("注册成功");
    });
});
//用户登录
router.post('/loginUser',function(req,res){
    var username = req.body.username;
    var pwd = req.body.pwd;
    console.log(username,pwd,"dasds");
    UserDAO.login(username,pwd,function(data){
        if(data.length > 0){

            res.send({status:1,id:data[0]._id});
        }else{
            res.send({status:0});
        }
    });
});



//获取显示数据

router.get('/showAll',function(req,res){
  var text = req.query.text;
  var option ={};
  if(text){
    option.name ={$regex:text}
  }
  UserDAO.findAll(option,function(data){
    res.send(data);
  });
});

router.post('/add',function(req,res){
  var email = req.body.email;
  var username = req.body.username;
  var pwd = req.body.pwd;
  var name = req.body.name;
  var contact = req.body.contact;
  var address = req.body.address;
  var modifier = req.body.modifier;
  UserDAO.insertUser({email:email,username:username,pwd:pwd,name:name,contact:contact,address:address,modifier:modifier},function(){
    res.send("已增加新用户");
  });
});
router.post('/del',function(req,res){
  var id =req.body.id;
  console.log(id);
  UserDAO.removeUser(id,function(){
    res.send("已删除用户");
  });
});

router.get('/showById',function(req,res){
  var id = req.query.id;
  UserDAO.showByUserId(id,function(data){
    res.send(data[0]);
  });
});

router.post('/update',function(req,res){
  var id = req.body.id;
  var email = req.body.email;
  var username = req.body.username;
  var pwd = req.body.pwd;
  var name = req.body.name;
  var contact = req.body.contact;
  var address = req.body.address;
  var modifier = req.body.modifier;
  console.log(id,name,contact,address,modifier);
  UserDAO.updateUser(id,{email:email,username:username,pwd:pwd,name:name,contact:contact,address:address,modifier:modifier},function(){
    res.send("修改成功");
  })
})





module.exports = router;
