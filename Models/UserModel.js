const mongoose = require("mongoose");
const {HashPassword} = require("../security/HashPassword");

// Define the User Schema
const UserSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    emailId: {
        type: String, 
        required: true
    }
});


HashPassword(UserSchema)

const User = mongoose.model('User', UserSchema);

module.exports = User;
