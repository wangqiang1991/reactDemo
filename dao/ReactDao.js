var db = require('./database');

module.exports.findAll = function(func){
	db.collection('react').find({},func);
}
