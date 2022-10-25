var mongoose = require("mongoose");


var userShema = mongoose.Schema({
    username: String,
    email: String,
    password: String,
    userType: String
});

var user = mongoose.model('User', userShema);

module.exports = user;