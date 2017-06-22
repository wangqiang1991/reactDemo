var express = require('express');
var router = express.Router();
var ReactDAO=require("../dao/FlowerDao.js");
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


//清空session
router.post('/upload',function(req,res){

	var name = req.body.file;
	console.log(name);
    res.send('注销！');
});

module.exports = router;
