const request = require("request");
const passport = require("passport");

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
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        dateJoined: new Date(req.body.dateJoined),
        lead: lead
    });

    Agent.register(agent, req.body.password, (err, registeredAgent) => {
        if(err){
            res.status(500).json({message:"There was an error creating the Agent", error: err})
        }else{
            //ADD AGENT TO LEAD LIST
            request.post(env.process.BASE_URL +`/lead/${lead._id}/agents/${registeredAgent.code}`, (err, res, body) => {
                if(err){
                    res.status(500).json({error: err, message: "Adding Agent to Lead failed"})
                }else{
                    res.status(200).json({code: registeredAgent.code, response: res, body: body, message: `Created Agent ${registeredAgent.code} successfully`});
                }
            });  
        }
    });
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
        //DELETE AGENT FROM LEAD LIST
        request.delete(env.process.BASE_URL +`/lead/${lead._id}/agents/${newAgent.code}`, (err, res, body) => {
            if(err){
                res.status(500).json({error: err, message: "Deleting Agent from Lead List failed"})
            }else{
                res.status(200).json({message: "Agent Deletion Success"});
            }
        });                
    }).catch(err => {
        res.status(500).json(err);
    })
}

//AGENT LOGIN
// /api/agent/login
exports.login = (req, res, next) => {
    passport.authenticate('agentLocal', function(err, agent, info) {
        if (err) { return next(err); }
        if (!agent) { return res.status(404).send("Agent Not found"); }
        req.logIn(agent, function(err) {
          if (err) { return next(err); }
          return res.status(200).json({message: "Login Success!",user: req.user})
        });
      })(req, res, next);
}

//AGENT LOGOUT
// /api/agent/logout
exports.logout = (req, res, next) => {
    req.logout();
    res.status(200).json({success: true, message: "Logout Success!"})
}