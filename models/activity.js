const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema({
    date: { type: Date, default: Date.now},
    lead: { type: mongoose.Schema.Types.ObjectId, ref: "Lead"},
    agent: { type: mongoose.Schema.Types.ObjectId, ref: "Agent"},
    leadName: String,
    agentName : String,
    agentType: String,
    village: {type: mongoose.Schema.Types.ObjectId, ref: "Village"},
    details: {
        freeCreditGiven: Number,
        activityType: {type: String, required: true},
        customer: {
            firstName: String,
            lastName: String
        },
        oldNumber: Number,
        newVodafoneNumber: Number,
        paidTopUp: Number,
        deviceType: String,
        handsetModel: String,
        handsetPrice: Number,
        freeOffer: String
    }
});

module.exports = mongoose.model("Activity", activitySchema);