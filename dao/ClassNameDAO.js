var db = require('./database');
module.exports.findAll = function(curpage,eachpage,func){
	db.collection('class').findByPage(curpage,eachpage,func);
}
module.exports.delete = function(id,func){
	db.collection('class').remove({_id:db.ObjectID(id)},func);
}
module.exports.insert = function(className,func){
	db.collection('class').insert({className:className},func);
}
module.exports.update = function(id,className,func){
	db.collection('class').update({_id:db.ObjectID(id)},{className:className},func);
}
module.exports.findGoods = function(func){
	db.collection('goods').find({},function(data){
		db.findJoin(data,"class",func);
	})
}

module.exports.phonefind = function(func){
	db.collection('class').find({},func)
};
