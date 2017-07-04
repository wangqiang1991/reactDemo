var db = require('./database');

module.exports.login = function(username,pwd,func){
	db.collection('user').find({username:username,password:pwd},func);
}