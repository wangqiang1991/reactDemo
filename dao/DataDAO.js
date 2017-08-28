var db=require("./database.js");


module.exports.findAll = function(func){
	db.collection("users").find({},func);
};

module.exports.loginin = function(username,pwd,func){
	db.collection('users').find({username:username,pwd:pwd},func);
}

module.exports.useradd = function(username,pwd,func){
	db.collection('users').insert({username:username,pwd:pwd},func);
}

module.exports.deluser = function(id,func){
	db.collection('users').remove({_id:db.ObjectID(id)},func);
}