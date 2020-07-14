const MtalaActivity = require("../models/mtala-activity");
const Agent = require("../models/agent");
const Lead = require("../models/lead");
const Village = require("../models/village");

const mtalaActivityMethods = require("../middleware/mtalaActivity");
const e = require("express");

// GET ALL MTALA ACTIVITIES
// /api/mtala
exports.getActivities = (req,res,next) => {
    MtalaActivity.find({}).populate("village").populate("agent").populate("lead").exec().then(activities => {
        res.status(200).json(activities);
    }).catch(err => {
        res.status(500).json(err);
    });
}

//GET AN MTALA ACTIVITY
// /api/mtala/:id
exports.getActivity = (req, res, next) => {
    MtalaActivity.findOne({_id: req.params.id}).then(activity => {
        res.status(200).json(activity);
    }).catch(err => {
        res.status(500).json(err);
    });
} 

//CREATE MTALA ACTIVITY
// api/mtala
exports.createActivity = async (req,res,next) => {
    if(!req.session.village) return res.status(400).json({message:"Please set a Village first"})
    try{
        var body = JSON.parse(req.body.details);
        var customer = body.customer;
        var dob = new Date(customer.dob);
        if(!mtalaActivityMethods.isLegalAge(dob)){
            return res.status(400).json({message:"Person must be over 18 to register for M-Tala"})
        }
        //Automated Details
        var now = new Date();
        var agent = await Agent.findById(req.user._id);
        var lead = await Lead.findById(agent.lead);
        var village = await Village.findById(req.session.village._id);

        //Manual Details
        var details = body;
        details.photoId = req.files['photoId'][0].path;
        details.signature = req.files['signature'][0].path;
        details.customer = customer;
        details.customer.dob = dob;
        details.newVodafoneNumber = Number(body.newVodafoneNumber)

        const activity = new MtalaActivity({
            date: now,
            lead: lead,
            agent: agent,
            leadName : `${lead.firstName} ${lead.lastName}`,
            agentName: `${agent.firstName} ${agent.lastName}`,
            village: village,           
            details: details            
        });

        await activity.save(async (err, savedActivity)=> {
            if(err){
                console.log(err.toString())
                res.status(500).json({message:"There was a an error creating the M-Tala activity", error: err.toString()})
            }else{
                //if successful, send an email to M-Tala of Registration
                mtalaActivityMethods.getEmailMessageFromActivity(activity).then(async emailResult => {
                    var email = emailResult.email;
                    var attachments = emailResult.attachments;
                    const result = await mtalaActivityMethods.sendEmail(email,attachments);
                    if(!result){
                        console.log('Success, Email not sent')
                        res.status(200).json({activity: savedActivity, message: "M-Tala Activity Saved, But Email not sent."});
                    }else{
                        console.log('Success, Email sent')
                        res.status(200).json({activity: savedActivity, message: "M-Tala Activity Saved, and Email sent successfully to "+process.env.M_TALA_EMAIL_ADDRESS});
                    }
                });

            }
        });
    }catch(err){
        console.log(err.toString())
        res.json({message:"There was a an error creating the M-Tala activity", error: err.toString()})
    }
}

//UPDATE MTALA ACTIVITY
// api/mtala/:id
exports.updateActivity = (req,res,next) => {
    var changes = req.body.changes;
    MtalaActivity.findByIdAndUpdate(req.params.id, changes, (err, foundActivity)=> {
        if(err || !foundActivity){
            res.status(500).json({message:"Failed to update M-Tala activity"});
        }else{
            res.status(200).json({message:"Updated M-Tala Activity Successfully"})
        }
    });
}

//DELETE MTALA ACTIVITY
// api/mtala/:id
exports.deleteActivity = (req, res, next) => {
    MtalaActivity.findByIdAndDelete(req.params.id, (err)=> {
        if(err){
            res.status(500).json({message:"Failed to delete M-tala activity"});
        }else{
            res.status(200).json({message:"M-Tala Activity Deleted Successfully"})
        }
    });
}

