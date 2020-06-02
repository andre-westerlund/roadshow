const mongoose = require("mongoose");

const leadSchema = new mongoose.Schema({
    firstName: { type: String, required: true},
    lastName: { type: String, required: true},
    agents: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Agent"
    }]

});

leadSchema.index({firstName: 1, lastName: 1}, { unique: true})

module.exports = mongoose.model("Lead", leadSchema);