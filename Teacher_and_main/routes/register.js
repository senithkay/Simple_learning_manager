var express = require("express");
var router = express.Router();
const user = require("../models/user");
var guest = require("../models/guestUser");

router.post("/",(req,res)=>{
    
    var e_mail = req.body.email;
    guest.findOne({email: e_mail}, (err,usr)=>{
        if(err) {
            console.log("error occured during registration");
            res.redirect("/signup", {data: "a"});
        }
        else if(!usr) {
            console.log("You are not approved");
            res.render("signup", {data: "You are not approved"});
        }
        else{
            var uname = req.body.username;
            user.findOne({username: uname}, (err, result)=>{
                if (err) {
                    console.log("Error occured!");
                    res.render("signup", {data: "Error occured!"});
                }
                else if(result){
                    console.log("User name is already in use.");
                    res.render("signup", {data: "User name is already in use."});
                }
                else{
                    
                    var pwd = req.body.password;
                    var uType = req.body.userType;
                    var newUser = new user({username: uname, email: e_mail, password: pwd, userType:uType});
        
                    newUser.save((err, usr)=>{
                        if (err) return console.log("could not save in in the database");
                        console.log("User saved");
                    });
                        res.redirect("/");
                }
                   
        
            });
        
        
            
        }
    });



});

module.exports = router;