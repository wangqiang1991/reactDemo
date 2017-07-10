var db = require('./database');

module.exports.findByUserName = function(username,func){
	db.collection('userManage').find({username:username},func);
}

module.exports.insert = function(username,pwd,func){
	db.collection('userManage').insert({username:username,pwd:pwd},func);
}

module.exports.findeByUserNameAndPwd = function(username,pwd,func){
	db.collection('userManage').find({username:username,pwd:pwd,modifier:"false"},func);
}
//用户登录
module.exports.login = function(username,pwd,func){
	db.collection('userManage').find({username:username,pwd:pwd},func);
}


//用户管理
module.exports.findAll = function(option,func){
	db.collection("userManage").find(option,func);
}


module.exports.insertUser = function(option,func){
	db.collection('userManage').insert(option,func);
}


module.exports.removeUser = function(id,func){
	db.collection('userManage').remove({_id:db.ObjectID(id)},func);
}


module.exports.showByUserId = function(id,func){

	db.collection('userManage').find({_id:db.ObjectID(id)},func);
}

module.exports.updateUser = function(id,option,func){

	db.collection('userManage').update({_id:db.ObjectID(id)},{$set:option},func);
}
