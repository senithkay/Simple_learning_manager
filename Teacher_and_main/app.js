var express = require("express");
var mongoose = require("mongoose");
var passport = require("passport");
var session = require("express-session");
const { connect } = require("http2");
const bodyParser = require("body-parser");


var signup = require("./routes/signup");
var register = require("./routes/register");
var root = require("./routes/root");
var login = require("./routes/login");
var log = require("./routes/log");
var content = require("./routes/content");
var teacher = require("./routes/teacher");
var student = require("./routes/student");
var adduser = require("./routes/adduser");
var adduserPros = require("./routes/adduserPros");
var addtask = require("./routes/addtask");
var tasks = require("./routes/tasks");
var addtaskpros = require("./routes/addtaskPros");
var edittask = require("./routes/edittask");
var edittaskpros = require("./routes/editpros");
var edituserpros = require("./routes/edituserpros");
var loginfailed = require("./routes/loginFail");
//remove
const guestUser = require("./models/guestUser");
const task = require("./models/tasks");



//configuring express and the db
var app = express();
mongoose.connect("mongodb://127.0.0.1:27017/assignment2");
var db = mongoose.connection;

db.on("error", ()=>{
    console.log("Could not connect to the database")
});
db.once('open', ()=>{
    console.log("connected to the database!");
})



//configuring the body-parser middleware
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//configuring express sessions
app.use(session({
    secret: "mata nidimathai",
    resave: true,
    saveUninitialized: true
}));

//setup passport middleware and passport session
app.use(passport.initialize());
app.use(passport.session());

//to serve static files
app.use(express.static("./public"));


app.set('view engine', 'ejs');

// access control
const whiteList = ["/", "/signup" , "/login" , "/register" , "/log"];

//access control middleware
function myMid(req,res,next){
    if (whiteList.includes(req.path) || req.isAuthenticated())
        next();

    else
        res.redirect("/");
    
}
app.use(myMid);


app.get("/logout", (req,res)=>{
    req.logout((err)=>{
        if (err){
            console.log("Could not logout");
            next();
        }
        else{
            res.redirect("/");
        }
    });
})


//delete this
app.delete("/teacher/:x",(req,res,next)=>{
    guestUser.deleteOne({_id: req.params.x},(err,result)=>{
        if(err){
            console.log("error occured while deleteing");
        }
        else{
            console.log("result");
        }
    });
    console.log(req.params.x);
    next();
});


app.delete("/teacher/tasks/:x",(req,res,next)=>{
    task.deleteOne({_id: req.params.x},(err,result)=>{
        if(err){
            console.log("error occured while deleteing");
        }
        else{
            console.log("result");
        }
    });
    console.log(req.params.x);
    next();
});

//routes
app.use("/signup", signup);
app.use("/register", register);
app.use("/", root);
app.use("/login", login);
app.use("/log", log);
app.use("/cont", content)
app.use("/teacher", teacher);
app.use("/student", student);
app.use("/teacher/adduser", adduser);
app.use("/teacher/adduser/pros", adduserPros);
app.use("/teacher/addtask", addtask);
app.use("/teacher/tasks", tasks);
app.use("/addtask/pros", addtaskpros);
app.use("/teacher/tasks/edit", edittask);
app.use("/edittask/pros", edittaskpros);
app.use("/edituser/pros", edituserpros);
app.use("/loginfailed", loginfailed);


app.listen(8080, ()=>{
    console.log("server started on port 8080"); 
});