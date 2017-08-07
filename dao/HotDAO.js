var db = require('./database');

module.exports.showAllGoods = function(func){
  db.collection('hotManage').find({},function(data){
    db.findJoin(data,"goods",func);
  });
};

module.exports.findHotGoods = function(curpage,eachpage,func){
  db.collection("hotManage").findByPage(curpage,eachpage,{},function(data){
  		db.findJoin(data.data,"goods",function(pageData){
  			data.data = pageData;
  			func(data);
  		});
  	});
};

module.exports.findGoodsByPage = function(curpage,eachpage,option,func){
	db.collection('goods').findByPage(curpage,eachpage,option,function(data){
		db.findJoin(data.data,"class",function(pageData){
			data.data = pageData;
			func(data);
		});
	});
};

module.exports.removeHot = function(id,func){
  db.collection('hotManage').remove({_id:db.ObjectID(id)},func);
};

module.exports.showClass = function(id,func){
  var option={};
  console.log(id);
  if(id){
    console.log(1231233);
    option={
        _id:db.ObjectID(id)
    };
  }
  db.collection('goods').find(option,function(data){
    db.findJoin(data,"class",func);
  });
};

module.exports.hotInsert = function(pid,func){
	db.collection('hotManage').insert({goods:{
		$ref:"goods",
		$id:db.ObjectID(pid)
	}},func);
};

module.exports.getAllGoods = function(func){
  db.collection('goods').find({},func);
};
