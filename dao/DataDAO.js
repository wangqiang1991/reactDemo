var db=require("./database.js");


module.exports.findAll = function(func){
	db.collection("users").find({},func);
};