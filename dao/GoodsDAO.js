var db = require("./database");

//查询商品信息
module.exports.findAll = function(curpage,eachpage,option,func){
  db.collection("goods").findByPage(curpage,eachpage,option,function(data){
    db.findJoin(data.data,"class",function(pageData){
      data.data = pageData;
      func(data);
    });
  });
}
module.exports.showgoodsList = function(option,func){
  db.collection("goods").find(option,function(data){
    db.findJoin(data,"class",function(pageData){
      data.data = pageData;
      func(data);
    });
  });
}
//添加商品信息
module.exports.insert = function(name,cid,price,count,
  color,size,salenum,index_img,
  detail_img,introtext,intro_img,
  address,collect,storeName,func){
  db.collection("goods").insert({name:name,
    class:{
      $ref:"class",
      $id:db.ObjectID(cid)
    },price:price,count:count,color:color,size:size,
    salenum:salenum,index_img:index_img,
    detail_img:detail_img,introtext:introtext,intro_img:intro_img,
    address:address,collect:collect,storeName:storeName,
  },func)
}
//查找分类
module.exports.finClass = function(option,func){
  db.collection("class").find(option,func);
}
// 删除
module.exports.remove = function (id,func) {
  db.collection("goods").remove({_id:db.ObjectID(id)},func)
}
//查询ID
module.exports.findById = function (id,func) {
  db.collection("goods").find({_id:db.ObjectID(id)},func);
}
//修改
module.exports.update = function (id,cid,option,func) {
  option.class={
    $ref:"class",
    $id:db.ObjectID(cid)
  }
  db.collection("goods").update({_id:db.ObjectID(id)},{$set:option},func);
}
