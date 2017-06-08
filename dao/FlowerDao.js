var db = require('./database');

module.exports.findAll = function(func){
	db.collection('react').find({},func);
}


//用户登录
module.exports.login = function(username,pwd,func){
	db.collection('user').find({username:username,password:pwd},func);
}