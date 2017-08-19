var db=require("./database.js");


module.exports.findAll = function(func){
	db.collection("users").find({},func);
};

module.exports.loginin = function(username,pwd,func){
	db.collection('users').find({username:username,pwd:pwd},func);
}