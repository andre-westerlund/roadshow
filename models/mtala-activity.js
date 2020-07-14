const mongoose = require("mongoose");

const mtalaActivitySchema = new mongoose.Schema({
    date: { type: Date, default: Date.now},
    lead: { type: mongoose.Schema.Types.ObjectId, ref: "Lead"},
    agent: { type: mongoose.Schema.Types.ObjectId, ref: "Agent"},
    leadName: String,
    agentName : String,
    village: {type: mongoose.Schema.Types.ObjectId, ref: "Village"},
    details: {
        customer: {
            firstName: {type: String, required:true},
            lastName: {type: String, required: true},
            dob: { type: Date, required: true},
            id: {type: String, unique: true}
        },
        newVodafoneNumber: {type: Number, unique: true},
        photoId: String,
        signature: String,
        mtalaActivityType: String
    }
});

module.exports = mongoose.model("MTalaActivity", mtalaActivitySchema);