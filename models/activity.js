const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema({
    date: { type: Date, default: Date.now},
    lead: { type: mongoose.Schema.Types.ObjectId, ref: "Lead"},
    agent: { type: mongoose.Schema.Types.ObjectId, ref: "Agent"},
    agentType: String,
    village: {type: mongoose.Schema.Types.ObjectId, ref: "Village"},
    freeCreditGiven: Number,
    activityType: {type: String, required: true},
    customer: {
        firstName: String,
        lastName: String
    },
    details: {
        oldNumber: Number,
        newVodafoneNumber: Number,
        paidTopUp: mongoose.Schema.Types.Decimal128,
        deviceType: String,
        handsetModel: String,
        handsetPrice: mongoose.Schema.Types.Decimal128,
        freeOffer: String
    }
});

module.exports = mongoose.model("Activity", activitySchema);