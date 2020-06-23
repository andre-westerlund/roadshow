const Activity = require("../models/activity");
const Agent = require("../models/agent");
const Lead = require("../models/lead");
const Village = require("../models/village");

const activityMethods = require("../middleware/activity");

// GET ALL ACTIVITIES
// /api/activity
exports.getActivities = (req,res,next) => {
    var q = {}
    if(req.user.code){
        q = activityMethods.getTodayQuery(req.user._id);
    }

    Activity.find(q).populate("village").then(activities => {
        res.status(200).json(activities);
    }).catch(err => {
        res.status(500).json(err);
    });
}

//GET AN ACTIVITY
// /api/activity/:id
exports.getActivity = (req, res, next) => {
    Activity.findOne({_id: req.params.id}).then(activity => {
        res.status(200).json(activity);
    }).catch(err => {
        res.status(500).json(err);
    });
} 

//CREATE ACTIVITY
// api/activity
exports.createActivity = async (req,res,next) => {
    if(!req.session.village) return res.status(400).json({message:"Please set a Village first"})
    try{
        //Automated Details
        var now = new Date();
        var agent = await Agent.findById(req.user._id);
        var lead = await Lead.findById(agent.lead);
        var village = await Village.findById(req.session.village._id);
        var agentType = activityMethods.getAgentType(now, agent.dateJoined);

        //Manual Details
        var details = req.body;

        const activity = new Activity({
            date: now,
            lead: lead,
            agent: agent,
            leadName : `${lead.firstName} ${lead.lastName}`,
            agentName: `${agent.firstName} ${agent.lastName}`,
            agentType: agentType,
            village: village,           
            details: details            
        });

        activity.save((err, savedActivity)=> {
            if(err){
                res.status(500).json({message:"There was a an error creating the activity", error: err.toString()})
            }else{
                res.status(201).json(savedActivity);
            }
        });
    }catch(err){
        res.json({message:"There was a an error creating the activity", error: err.toString()})
    }
}

//UPDATE ACTIVITY
// api/activity/:id
exports.updateActivity = (req,res,next) => {
    var changes = req.body.changes;
    Activity.findByIdAndUpdate(req.params.id, changes, (err, foundActivity)=> {
        if(err || !foundActivity){
            res.status(500).json({message:"Failed to update activity"});
        }else{
            res.status(200).json({message:"Updated Activity Successfully"})
        }
    });
}

//DELETE ACTIVITY
// api/activity/:id
exports.deleteActivity = (req, res, next) => {
    Activity.findByIdAndDelete(req.params.id, (err)=> {
        if(err){
            res.status(500).json({message:"Failed to delete activity"});
        }else{
            res.status(200).json({message:"Activity Deleted Successfully"})
        }
    });
}

