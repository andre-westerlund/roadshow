const mongoose = require("mongoose");

const villageSchema = new mongoose.Schema({

    code : { type: number, unique: true, required: true},
    district: string,
    island: string,
    type: string,
    name: string

});

module.exports = mongoose.model("Village", villageSchema);