var express = require("express");
var router = express.Router();
const task = require("../models/tasks");

router.post("/",(req,res)=>{    
    console.log(req.body);
    var taskName = req.body.taskName;
    task.findOne({name: taskName}, (err, result)=>{
        if (err) {
            console.log("Error occured!");
            res.redirect("/teacher/tasks");
        }
        else if(result){
            console.log("Duplicate task name");
            res.redirect("/teacher/tasks");
        }
        else{
            var dcp = req.body.description;
            var deadl = req.body.deadline;
            var newTask = new task({name: taskName, description: dcp, deadline: deadl});

            newTask.save((err, usr)=>{
                if (err) return console.log("could not save in in the database");
                console.log("User saved");
            });
                res.redirect("/teacher/tasks");
        }
           

    });


    

});

module.exports = router;