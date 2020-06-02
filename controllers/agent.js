const Agent = require("../models/agent");
const Lead = require("../models/lead");


//GET ALL AGENTS
exports.getAgents = (req, res, next) => {
    Agent.find({}).then(agents => {
        res.status(200).json(agents);
    }).catch(err => {
        res.status(500).json(err);
    });
}

//GET AGENT
// /api/agent/:code
exports.getAgent = (req,res,next) => {
    Agent.findOne({code : req.params.code}).then(foundAgent => {
        res.status(200).json(foundAgent);
    }).catch(err => {
        res.status(500).json(err);
    })
}

//CREATE AGENT
// /api/agent
exports.createAgent = (req,res,next) => {
    let lead;
    Lead.findById(req.body.leadId).then(foundLead => {
        lead = foundLead;
    }).catch(err => {
        res.status(500).json(err);
    });
    var agent = new Agent({
        code: req.body.code,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        dateJoined: new Date(req.body.dateJoined),
        lead: lead
    });
    agent.save().then(newAgent => {
        res.status(200).json(newAgent.code);
    }).catch(err => {
        res.status(500).json(err);
    })
}

//UPDATE AGENT
// /api/agent/:code
exports.updateAgent = (req,res,next) => {
    var changes = req.body;
    Agent.updateOne({code: req.params.code}, changes).then(updatedAgent => {
        res.status(200).json({message: "Agent Updated Successfully"})
    }).catch(err => {
        res.status(500).json(err);
    })
}

//DELETE AGENT
// /api/agent/:code
exports.deleteAgent = (req, res, next) => {
    Agent.deleteOne({code: req.params.code}).then(function(){
        res.status(200).json({message: "Agent Deletion Success"})
    }).catch(err => {
        res.status(500).json(err);
    })
}