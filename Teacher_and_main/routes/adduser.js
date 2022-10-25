var express = require("express");
var router = express.Router();
var resolve = require("path").resolve;

router.get("/",(req,res)=>{
    res.render("adduser");
});


module.exports = router;