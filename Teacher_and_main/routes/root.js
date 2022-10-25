var express = require("express");
var router = express.Router();
var resolve = require("path").resolve;


router.get("/",(req,res)=>{
    var x = "senith"
    res.render("landing");
});

module.exports = router;