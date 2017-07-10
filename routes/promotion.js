var express = require('express');
var router = express.Router();
var PromotionDAO = require('../dao/PromotionDAO');

/* GET home page. */
router.get('/', function(req, res, next) {
  	res.render('index', { title: 'Express' });
});

router.post('/findAll', function(req, res) {
	var curpage = req.body.curpage;
	var eachpage = 3;
	PromotionDAO.findAll(curpage,eachpage,function(data){
		res.send(data);
	})
});

router.post('/findPromotion', function(req, res) {
	PromotionDAO.findAllPromotion(function(data){
		res.send(data);
	})
});

router.post('/findGoods', function(req, res) {
	var id = req.body.id;
	PromotionDAO.findGoods(id,function(data){
			res.send(data);
	})
});

router.post('/findGoodsByPage', function(req, res) {
	var curpage = req.body.curpage;
	var eachpage = 3;
	PromotionDAO.findGoodsByPage(curpage,eachpage,function(data){
			res.send(data);
	})
});

router.post('/insertPromotion', function(req, res) {
	var id = req.body.id;
	PromotionDAO.insert(id,function(data){
		res.send(data);
	})
});

router.post('/delete', function(req, res) {
	var id = req.body.id;
	PromotionDAO.delete(id,function(){
		res.send("删除成功");
	})
});

module.exports = router;
