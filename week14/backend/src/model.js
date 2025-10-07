const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    username: String,
    password: String,
    publicKey: String,
    privateKey: String
});

const userModel = mongoose.model(UserSchema, "User");

module.exports = {
    userModel
}