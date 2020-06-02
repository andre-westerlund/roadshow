const Lead = require("../models/lead");
const Agent = require("../models/agent");

//GET ALL LEADS
exports.getLeads = (req, res, next) => {
    Lead.find({}, (err, leads) => {
        if(err){
            res.status(500).json({
                message: `Error: ${err}\nFetching Leads failed`
            });
        }else{
            res.status(200).json({
                leads
            });
        }
    });
}

//GET LEAD
//api/lead/:id
exports.getLead = (req, res, next) => {
    Lead.findOne({ _id: req.params.id}, (err, foundLead) => {
        if(err || !foundLead){
            res.status(500).json({
                message: `Error: ${err}\nFetching Lead with id ${req.params.id} failed`
            });
        }else{
            res.status(200).json(foundLead);
        }
    });
}

//GET LIST OF AGENTS OF LEAD
//api/lead/:id/agents
exports.getLeadAgents = (req, res, next) => {
    Lead.findById(req.params.id).populate("agents").exec().then(foundLead => {
        res.status(200).json(foundLead.agents);
    }).catch(err => {
        res.status(500).json({
            message: `Error: ${err}\nFetching Agents of Lead with id ${req.params.id} failed`
        });
    });
}

//REMOVE AGENT OF LEAD
//api/lead/:id/agents/:code
exports.removeAgent = async (req, res, next) => {
    var agentCode = req.params.code;
    var agent = await Agent.findOne({code: agentCode});
    Lead.updateOne({_id: req.params.id}, 
        { $pull: {
            'agents': agent._id
        }})
    .then(updatedLead => {
        res.status(200).json({message: `Successfully Removed Agent-${agentCode} from Lead-${req.params.id}`})
    }) 
    .catch(err => {
        res.status(500).json({
            message: `Error: ${err}`
        });
    });
}

//ADD AN AGENT TO A LEAD
//api/lead/:id/agents/:code
exports.addAgent = (req, res, next) => {
    var agentCode = req.params.code;
    Lead.findOne({_id: req.params.id}).then(foundLead => {
        Agent.findOne({code: agentCode}).then(foundAgent => {
            if(foundAgent.lead){
                return res.status(500).json({message:"That Agent already has an existing Lead"});
            }
            foundLead.agents.push(foundAgent);
            foundLead.save((err, savedLead) => {
                if(err){
                    res.status(500).json({
                        message: `Error: ${err}`
                    });
                }else{
                    res.status(200).json({
                        message: `Successfully Added Agent-${agentCode} to Lead-${savedLead._id}`
                    });
                }
            });
        })
    }).catch(err => {
        res.status(500).json({
            message: `Error: ${err}`
        });
    })
}

//CREATE A NEW LEAD
exports.createLead = (req,res,next) => {
    var lead = new Lead({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        agents: []
    });
    lead.save((err, savedLead) => {
        if(err){
            res.status(500).json({
                message: `Error: ${err}\nThere was an error saving the Lead`
            });
        }else if(savedLead){
            res.status(200).json({
                _id: savedLead._id
            });
        }else{
            res.status(500).json({
                message: `Error: There was an error saving the Lead\nLead created is Null/Undefined`
            });
        }
    });
}
//UPDATE EXISTING LEAD
//api/lead/:id
exports.updateLead = (req,res,next) => {
    var changes = req.body;
    Lead.updateOne({_id: req.params.id}, changes, (err, updatedLead) => {
        if(err || !updatedLead){
            res.status(500).json({
                message: `Error: ${err}\nThere was an error updating the Lead`
            });
        }else{
            res.status(200).json({
                message: `Lead Updated Successfully`,
                _id: updatedLead._id
            });
        }
    })
}

//DELETE A LEAD
//api/lead/:id
exports.deleteLead = (req,res,next) => {
    Lead.deleteOne({_id: req.params.id}, (err) => {
        if(err){
            res.status(500).json({
                message: `Error: ${err}\nThere was an error deleting the Lead`
            });
        }else{
            //TODO
            //Remove this lead from all the agents 
            res.status(200).json({
                message: `Lead Deleted Successfully`
            });
        }
    })
}