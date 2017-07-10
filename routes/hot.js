var express = require('express');
var router = express.Router();
var HotDAO = require('../dao/HotDAO');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/hotInfo',function(req, res){
  var curpage = req.query.curpage;
  HotDAO.findHotGoods(curpage, 3, function(data) {
      res.send(data);
  });
});

router.get('/hotClass',function(req, res){
  var id = req.query.id;
  HotDAO.showClass(id,function(data){
    res.send(data);
  });
});

router.post('/remHot',function(req, res){
  var id = req.body.id;
  HotDAO.removeHot(id,function(){
    res.send('删除成功');
  });
});

router.post('/showAllGoods',function(req, res){
  HotDAO.showAllGoods(function(data){
    res.send(data);
  });
});

router.post('/insertHot',function(req,res){
  var id = req.body.id;
  HotDAO.hotInsert(id,function(){
    res.send("插入成功!");
  });
});


router.post('/findGoodsByPage', function(req, res) {
	var curpage = req.body.curpage;
	var eachpage = 3;
  var text = req.body.text;
  var option = {};
  if(text && text !== "undefined"){
    option.name ={$regex:text};
  }
  console.log(option);
	HotDAO.findGoodsByPage(curpage,eachpage,option,function(data){
			res.send(data);
	});
});


module.exports = router;
