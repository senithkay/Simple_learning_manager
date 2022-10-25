var express = require("express");
var router = express.Router();
var resolve = require("path").resolve;

router.get("/",(req,res)=>{
    if(req.user.userType==="Teacher")
        res.redirect("/teacher");
    else    
        res.redirect("/student");
});

module.exports = router;