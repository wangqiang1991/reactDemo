var express = require('express');
var router = express.Router();
var ClassNameDAO = require('../dao/ClassNameDAO');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/findAll', function(req, res) {
	var curpage = req.body.curpage;
	var eachpage = 3;
	ClassNameDAO.findAll(curpage,eachpage,function(data){
		res.send(data);
	})
});

router.post('/phonefind', function(req, res) {
	ClassNameDAO.phonefind(function(data){
		res.send(data);
	})
});

router.post('/findGoods', function(req, res) {
	ClassNameDAO.findGoods(function(data){
		res.send(data);
	})
});

router.post('/insert', function(req, res) {
	var className = req.body.className;
	ClassNameDAO.insert(className,function(){
		res.send("添加成功");
	})
});

router.post('/update', function(req, res) {
	var id = req.body.id;
	var className = req.body.className;
	ClassNameDAO.update(id,className,function(data){
		res.send(data);
	})
});

router.post('/delete', function(req, res) {
	var id = req.body.id;
	ClassNameDAO.delete(id,function(data){
		res.send(data);
	})
});


module.exports = router;
