const mongoose = require("mongoose");

const villageSchema = new mongoose.Schema({
    code : { type: String, unique: true, required: true},
    district: String,
    island: String,
    type: String,
    name: String

});

module.exports = mongoose.model("Village", villageSchema);