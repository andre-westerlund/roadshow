const mongoose = require("mongoose");

const leadSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    agents: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Agent"
    }]

});

module.exports = mongoose.model("Lead", leadSchema);