var express = require("express");
var router = express.Router();

const credential = {
    email:"admin",
    password: "admin123"
}

//login user
router.post('/login',(req,res)=>{
    if(req.body.email == credential.email && req.body.password == credential.password){
        req.session.user = req.body.email;
        res.redirect('http://localhost:3000/');
       //res.end("Login Successful");
    }else{
        res.end("Invalid Username");
    }
});

module.exports = router;