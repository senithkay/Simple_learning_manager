var express = require("express");
var router = express.Router();
const task = require("../models/tasks");


router.get("/",(req,res)=>{
    task.find({}, (err,result)=>{
        if (err){
            console.log("could not fetch users data");
            return;
        } 
        else{

            res.render("student", {data: result});
        }
    })

    
});


module.exports = router;