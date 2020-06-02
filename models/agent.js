const mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

const agentSchema = new mongoose.Schema({
    code: {type: String, unique: true, required: true},
    password: { type: String, required: true},
    firstName: String,
    lastName: String,
    dateJoined: Date,
    lead: {type: mongoose.Schema.Types.ObjectId, ref: "Lead"}
});
agentSchema.index({firstName: 1, lastName: 1}, { unique: true})
agentSchema.plugin(passportLocalMongoose)
module.exports = mongoose.model("Agent", agentSchema);