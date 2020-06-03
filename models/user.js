const mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new mongoose.Schema({
    email : { type: String, required: true, unique: true},
    password : String,
    firstName: String,
    lastName: String,
    isAdmin: {
      type: Boolean,
      default: false
    }
  });
  userSchema.plugin(passportLocalMongoose, { usernameField: 'email'});
  module.exports = mongoose.model("User", userSchema);
  