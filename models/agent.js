const mongoose = require("mongoose");

const agentSchema = new mongoose.Schema({
    code: {type: String, unique: true, required: true},
    password: { type: String, required: true},
    firstName: String,
    lastName: String,
    dateJoined: Date,
    leadId: {type: mongoose.Schema.Types.ObjectId, ref: "Lead"}
});

module.exports = mongoose.model("Agent", agentSchema);