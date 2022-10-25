var mongoose = require("mongoose");


var guestSchema = mongoose.Schema({
    username: String,
    email: String,
    gender: String,
    status: String
});

var guestUser = mongoose.model('guestUser', guestSchema);

module.exports = guestUser;