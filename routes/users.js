var express = require('express');
var router = express.Router();

var DataDAO=require("../dao/DataDAO.js");
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get("/showall",function(req,res){
    DataDAO.findAll(function(data){
      res.send(data);
    });
});

module.exports = router;
