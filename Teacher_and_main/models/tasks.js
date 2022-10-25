var mongoose = require("mongoose");


var taskSchema = mongoose.Schema({
    name: String,
    description: String,
    deadline: Date
});

var task = mongoose.model('Task', taskSchema);

module.exports = task;