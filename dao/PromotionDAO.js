var db = require('./database');
module.exports.findAll = function(curpage,eachpage,func){
	db.collection('promotion').findByPage(curpage,eachpage,{},function(data){
		db.findJoin(data.data,"goods",function(pageData){
			data.data = pageData;
			func(data);
		})
	});
}
module.exports.findAllPromotion = function(func){
	db.collection('promotion').find({},function(data){
		db.findJoin(data,"goods",func)
	});
}
module.exports.findGoodsByPage = function(curpage,eachpage,func){
	db.collection('goods').findByPage(curpage,eachpage,{},function(data){
		db.findJoin(data.data,"class",function(pageData){
			data.data = pageData;
			func(data);
		})
	});
}
module.exports.findGoods = function(id,func){
	var option = {};
	if(id){
		option = {
			_id:db.ObjectID(id)
		};
	}else{
		option = {};
	}
	db.collection('goods').find(option,function(data){
		db.findJoin(data,"class",func)
	});
}
module.exports.insert = function(pid,func){
	db.collection('promotion').insert({goods:{
		$ref:"goods",
		$id:db.ObjectID(pid)
	}},func);
}
module.exports.delete = function(pid,func){
	db.collection('promotion').remove({_id:db.ObjectID(pid)},func);
}
