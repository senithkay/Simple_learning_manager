var express = require("express");
var router = express.Router();
const task = require("../models/tasks");

router.post("/",(req,res)=>{    
    console.log(req.body);
    
    task.findOne({_id: req.body.id}, (err, result)=>{
        if (err) {
            console.log("Error occured!");
            res.redirect("/teacher/tasks");
        }
        else if(!result){
            console.log("Could not find the task");
            res.redirect("/teacher/tasks");
        }
        else{
            
            var taskName = req.body.taskName;
            var description = req.body.description;
            var deadl = req.body.deadline;
            if(!taskName)
                taskName = result.name;
            if(!description)
                description = result.description;
            if(!deadl)
                description = result.deadline;
            console.log(taskName);
            console.log(description);
            console.log(deadl);
            task.updateOne({_id:  req.body.id}, {name: taskName, description: description, deadline: deadl},(err,res)=>{
                if(err) {
                    console.log("Could not update the record");
                }
                else{
                    console.log(result);
                }
            });

            res.redirect("/teacher/tasks");
        }
           

    });


    

});

module.exports = router;