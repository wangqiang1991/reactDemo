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

module.exports.update = function(id,username,pwd,func){
	db.collection('users').update( {_id:db.ObjectID(id)} , {$set:{username:username,pwd:pwd}} ,func);
}



module.exports.floweradd = function(flowername,flowermean,flowervlaue,flowerurl,func){
	db.collection('flower').insert({flowername:flowername,flowermean:flowermean,flowervlaue:flowervlaue,flowerurl:flowerurl},func);
}


module.exports.findAllflower = function(curpage,eachpage,func){
  db.collection("flower").findByPage(curpage,eachpage,func);
}

module.exports.delflower = function(id,func){
	db.collection('flower').remove({_id:db.ObjectID(id)},func);
}


module.exports.showall4picture = function(func){
	db.collection("flower").find({},func);
};

module.exports.findsomeflower = function(flowername,func){
	db.collection('flower').find({flowername:{$regex:flowername}},func);
}