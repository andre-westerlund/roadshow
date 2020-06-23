const request = require("request");
const passport = require("passport");

const Agent = require("../models/agent");
const Lead = require("../models/lead");
const Village = require("../models/village");

//GET ALL AGENTS
exports.getAgents = (req, res, next) => {
    Agent.find().populate('lead').then(agents => {
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
exports.createAgent = async (req,res,next) => {
    var lead = await Lead.findById(req.body.lead);
    if(lead == null || lead == undefined){
        return res.status(401).json({message:"Please provide an existing Lead"})
    }
    var agent = {
        code: req.body.code,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        dateJoined: new Date(req.body.dateJoined),
        lead: lead
    };
    Agent.register(agent, req.body.password, (err, registeredAgent) => {
        if(err || !registeredAgent){
            res.status(500).json({message:"There was an error creating the Agent", error: err.toString()})
        }else{
            //ADD AGENT TO LEAD LIST
            const options = {
                url: process.env.BASE_URL +`/lead/${lead._id}/agents/${registeredAgent.code}`,
                headers: {
                    "Cookie": `roadshow_sid=${req.cookies['roadshow_sid']}; Path=/; HttpOnly;`
                },
                body: ""
            };
            request.post(options,(err, response, body) => {
                if(err || (response.statusCode != 200 && response.statusCode != 201) ){
                    res.status(500).json({error: err, message: "Adding Agent to Lead failed", body: body})
                }else{
                    res.status(200).json({message: `Created Agent ${registeredAgent.code} successfully. Added to Agent List of ${lead.firstName} ${lead.lastName} (${lead._id})`});
                }
            });  
        }
    });
}

//UPDATE AGENT
// /api/agent/:code
exports.updateAgent = async (req,res,next) => {
try{
    var lead = await Lead.findById(req.body.lead);
    var agent = await Agent.findOne({code: req.params.code});
    
    var changes = {
      code: req.body.code,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      dateJoined: req.body.dateJoined
    };
    
    var passChange = "";
    Agent.findOneAndUpdate({code: req.params.code}, changes, {new: true}).then(updatedAgent => {
    console.log(updatedAgent)
        //IF NEW PASSWORD SET FOR AGENT
        if(req.body.password != null && req.body.password != ""){
          updatedAgent.setPassword(req.body.password , function(){
          updatedAgent.save();
          passChange+= " & Password Updated Successfully."
        });
       }
        //IF NEW LEAD
        if(lead._id.toString() !== agent.lead.toString()){
         //ADD AGENT TO LEAD LIST
            const options = {
                url: process.env.BASE_URL +`/lead/${lead._id}/agents/${updatedAgent.code}`,
                headers: {
                    "Cookie": `roadshow_sid=${req.cookies['roadshow_sid']}; Path=/; HttpOnly;`
                },
                body: ""
            };
            request.post(options,(err, response, body) => {
                if(err || (response.statusCode != 200 && response.statusCode != 201) ){
                    res.status(500).json({error: err, message: "Adding Agent to Lead failed", body: body})
                }else{
                    res.status(200).json({message: `Updated Agent ${updatedAgent.code} successfully. ${passChange}. Added to Agent List of ${lead.firstName} ${lead.lastName} (${lead._id})`, body:body, response: response});
                }
            });
        
        }else{
          res.status(200).json({message: "Agent Updated Successfully" })
        }
    }).catch(err => {
        res.status(500).json(err.toString());
    })
}catch(err){
res.json({error: err.toString(), message: "There was an issue Updating Agent"})
}
}

//DELETE AGENT
// /api/agent/:code
exports.deleteAgent = async (req, res, next) => {
    try{
        var agent = await Agent.findOne({code: req.params.code});
        var lead = await Lead.findOne({_id: agent.lead });
    }catch(err){
        return res.status(401).json({
            message: "Bad Request. Cannot find that Agent or Lead."
        })
    }
    Agent.deleteOne({_id: agent._id}).then(function(){
        //DELETE AGENT FROM LEAD LIST
        request.delete(process.env.BASE_URL +`/lead/${lead._id}/agents/${agent._id}?isId=true`, (err, response, body) => {
            if(err && response.statusCode != 200 && response.statusCode != 201){
                res.status(500).json({error: err, message: "Agent Deletion Success. Deleting Agent from Lead List failed"})
            }else{
                res.status(200).json({message: `Agent Deletion Success. Agent ${agent.code} removed from Agent List of ${lead.firstName} ${lead.lastName} (${lead._id})`});
            }
        });                
    }).catch(err => {
        res.json({
            error: err, message: "There was an error deleting Agent"}
            );
    })
}

//AGENT LOGIN
// /api/agent/login
exports.login = (req, res, next) => {
    passport.authenticate('agentLocal', function(err, agent, info) {
        if (err) { return next(err); }
        if (!agent) { return res.status(404).json("Incorrect Agent Code/Password"); }
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
    req.session.village = null;
    res.status(200).json({success: true, message: "Logout Success!"})
}

//AGENT SET VILLAGE FOR SESSION
// /api/agent/village/:villageId
exports.setVillage = (req,res,next) => {
    Village.findById(req.params.villageId).then(foundVillage => {
        req.session.village = foundVillage;
        res.status(200).json({
            success: true,
            message: `${foundVillage.name} set for Activity`,
            village: foundVillage
        })
    }).catch(err => {
        console.log(err)
        res.status(401).json({
            message: "Bad Request. Village does not exist",
            error: err
        })
    })
}

//GET CURRENT VILLAGE OF AGENT
// /api/agent/village/
exports.getVillage = (req,res,next) => {
    if(req.session.village){
        res.status(200).json(req.session.village)
    }else{
        res.status(404).json({message:"No Village currently set."});
    }
}