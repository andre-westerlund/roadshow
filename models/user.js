const mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new mongoose.Schema({
    email : { type: String, required: true, unique: true},
    password : { type: String, required: true},
    firstName: String,
    lastName: String
  });
  userSchema.plugin(passportLocalMongoose);
  module.exports = mongoose.model("User", userSchema);
  