var express = require("express");
const passport = require("passport");
var router = express.Router();
var localStrategy = require("passport-local").Strategy;
var User = require("../models/user");


passport.serializeUser((user,cb)=>{
    cb(null, user.id);
});

passport.deserializeUser((id,cb)=>{
    User.findOne({_id: id},(err,user)=>{
        cb(err, user);
    });
});

passport.use('strg1', new localStrategy(
    (uname, pwd, done)=> {  
        User.findOne({username: uname}, (err, result)=>{
            if (err){
                console.log("could not find the user from the database");
                return done(null, false);
            }
            if(!result) {
                console.log("wrong user name");
                return done(null, false);
            }             
            else {
                if (result.password === pwd)
                    return done(null, result);
                 else    
                    return done(null, false);                   
            }
        });
    })
);




router.post("/", passport.authenticate("strg1", {
    successRedirect : "/cont",
    failureRedirect : "/loginfailed"
}));





module.exports = router;