var db=require("./database.js");


module.exports.findAll = function(func){
	db.collection("orderManage").find({},function(data){
		db.findJoin(data,"userManage",func);
	});
};


module.exports.delData=function(id,func){
      db.collection("orderManage").remove({_id:db.ObjectID(id)},func);
};


module.exports.upData=function(id,statu,func){
      db.collection("orderManage").update({_id:db.ObjectID(id)},{$set:{statu:statu}},func);
};


module.exports.add = function(uid,name,time,price,statu,size,singleprice,number,img,func){
	db.collection("orderManage").insert({userManage:{
		$ref:"userManage",
		$id:db.ObjectID(uid)
	},name:name,time:time,price:price,statu:statu,size:size,singleprice:singleprice,number:number,img:img},func);
};


module.exports.phoneUpdate=function(id,price,size,number,func){
      db.collection("orderManage").update({_id:db.ObjectID(id)},{$set:{price:price,number:number}},func);
};
