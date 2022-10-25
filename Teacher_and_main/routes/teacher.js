var express = require("express");
var router = express.Router();
const guestUser = require("../models/guestUser");


router.get("/",(req,res)=>{
    guestUser.find({}, (err,result)=>{
        if (err){
            console.log("could not fetch users data");
            return;
        } 
        else{

            res.render("teacher", {data: result});
        }
    })

    
});


module.exports = router;