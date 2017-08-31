var express = require('express');
var router = express.Router();
var qiniu = require("qiniu");
var DataDAO=require("../dao/DataDAO.js");

//七牛云生成token
var accessKey = 'a6dDGNShmuvXa6WPSYEisBaIfKCxJNUJvcQURCN-';
var secretKey = 'VfeKm7Vi0EtU-Sf1o9P86mh7-exiWW9TaOTO8gUj';
var mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
var options = {
  scope: 'flower',
};
var putPolicy = new qiniu.rs.PutPolicy(options);
var bucketManager = new qiniu.rs.BucketManager(mac);

//获取token
router.post('/uploadToken', function(req, res) {
	var uploadToken=putPolicy.uploadToken(mac);
	res.send(uploadToken)
});

//增加花汇
router.post('/addflower', function(req, res) {
	 var flowername = req.body.flowername;
     var flowermean = req.body.flowermean;
     var flowervlaue = req.body.flowervlaue;
     var flowerurl = req.body.flowerurl; 
	 DataDAO.floweradd(flowername,flowermean,flowervlaue,flowerurl,function(){
            res.send('success')
       })
});

//分页展示所有花汇
router.get("/showall",function(req,res){
  var curpage  = req.query.curpage;
  var eachpage = 4;
  DataDAO.findAllflower(curpage,eachpage,function(data){
    res.send(data);
  });
});


//首页展示随机4张图片
router.get("/showall4picture",function(req,res){
  DataDAO.showall4picture(function(data){
      res.send(data); 
  });
});


//查找花汇
router.get("/findsomeflower",function(req,res){
  var flowername  = req.query.flowername;
  DataDAO.findsomeflower(flowername,function(data){
    res.send(data);
  });
});


//删除花汇
router.get("/delflower",function(req,res){
   var bucket = "flower";
  var id  = req.query.id;
  var key = req.query.key;
  DataDAO.delflower(id,function(){
    res.send('success');
  });
 
  bucketManager.delete(bucket, key, function(err, respBody, respInfo) {
    if (err) {
      console.log(err);
      //throw err;
    } else {
      console.log(respInfo.statusCode);
      console.log(respBody);
    }
  });


});



module.exports = router;
