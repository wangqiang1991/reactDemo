var express = require('express');
var router = express.Router();
var ReactDAO=require("../dao/ReactDAO.js");


router.get("/showall",function(req,res){
    ReactDAO.findAll(function(data){
      res.send(data);
    });
});
module.exports = router;