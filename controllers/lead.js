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
    var leadId = req.params.id;
    var lead = await Lead.findById(leadId);
    var agentList = lead.agents;
    try{
        var agent;
        var desiredAgent;
        if(req.query.isId){
            agent = agentCode
            desiredAgent = agentList.find(item => item == agent);
        }else{
            agent = await Agent.findOne({code: agentCode});
            desiredAgent = agentList.find(item => item == agent._id);
        }  
        
        var indexOfDesiredAgent = agentList.indexOf(desiredAgent);
        agentList.splice(indexOfDesiredAgent, 1);
        lead.save();
        if(!req.query.isId){
            //Removes Lead Field in Agent
            agent.lead = null;
            agent.save();
        }
        res.status(200).json({message: `Successfully removed Agent ${agentCode} from Agent List of ${lead.firstName} ${lead.lastName} (${lead._id})`});
    }catch(err){
        console.log(err)
        return res.json({error: err, message: "Bad Request"})
    }
}

//ADD AN AGENT TO A LEAD
//api/lead/:id/agents/:code
exports.addAgent = async (req, res, next) => {
    var agentCode = req.params.code;
    var leadId = req.params.id;
    try{
        var agent = await Agent.findOne({code: agentCode});
        var lead = await Lead.findById(leadId);
        //If Changing Lead of Agent, Remove Agent From Old Lead's List of Agents
        if(agent.lead.toString() !== lead._id.toString()){
            console.log(`Agent.Lead - ${agent.lead} - TYPE ${typeof agent.lead}`)
            console.log(`Lead._ID - ${lead._id} - TYPE ${typeof lead._id}`)
            var oldLead = await Lead.findById(agent.lead);
            var listOfAgents = oldLead.agents;
            var agentInList = listOfAgents.find(item => item == agent._id);
            listOfAgents.splice(listOfAgents.indexOf(agentInList), 1);
            oldLead.save();
        }
        //Checking if Agent is already in Lead List
        if(lead.agents.includes(agent._id))
        {
            res.status(400).json({
                message: `Bad Request, Agent-${agentCode} is already in Lead ${lead.firstName} ${lead.lastName} (${lead._id}) Agent List`
            });
        }else{
            lead.agents.push(agent);
            lead.save();
            agent.lead = lead;
            agent.save();
            res.status(200).json({
                message: `Successfully Added Agent-${agentCode} to Lead ${lead.firstName} ${lead.lastName} (${lead._id}) Agent List`
            });
        }
    }catch(err){
        res.json({error: err, message: "There was an issue adding the Agent to Lead List"})
    }
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