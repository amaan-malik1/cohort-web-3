const mongoose = require("mongoose");
const Schema = mongoose.Schema();

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