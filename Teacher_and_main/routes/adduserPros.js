var express = require("express");
var router = express.Router();
const user = require("../models/guestUser");

router.post("/",(req,res)=>{

    var uname = req.body.username;
    user.findOne({username: uname}, (err, result)=>{
        if (err) {
            console.log("Error occured!");
            res.redirect("/signup");
        }
        else if(result){
            console.log("User name is already in use.");
            res.redirect("/teacher");
        }
        else{
            var e_mail = req.body.email;
            var gender = req.body.gender;
            var status = req.body.status;
            var newUser = new user({username: uname, email: e_mail, gender: gender, status:status});

            newUser.save((err, usr)=>{
                if (err) return console.log("could not save in in the database");
                console.log("User saved");
            });
                res.redirect("/teacher");
        }
           

    });


    

});

module.exports = router;