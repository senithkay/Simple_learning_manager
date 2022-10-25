var express = require("express");
var router = express.Router();
const guest = require("../models/guestUser");

router.post("/",(req,res)=>{    
    console.log(req.body);
    
    guest.findOne({_id: req.body.id}, (err, result)=>{
        if (err) {
            console.log("Error occured!");
            res.redirect("/teacher");
        }
        else if(!result){
            console.log("Could not find the task");
            res.redirect("/teacher");
        }
        else{
            
            var name = req.body.name;
            guest.updateOne({_id:  req.body.id}, {username: name},(err,res)=>{
                if(err) {
                    console.log("Could not update the record");
                }
                else{
                    console.log(result);
                }
            });

            res.redirect("/teacher");
        }
           

    });


    

});

module.exports = router;