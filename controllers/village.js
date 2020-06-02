const Village = require("../models/village");

//GET ALL VILLAGES
exports.getVillages = (req, res, next) => {
    Village.find({}, (err, villages) => {
        if(err){
            res.status(500).json({
                message: `Error: ${err}\nFetching Villages failed`
            });
        }else{
            res.status(200).json({
                villages
            });
        }
    });
}

//GET VILLAGE
//api/village/:code
exports.getVillage = (req, res, next) => {
    Village.findOne({ code: req.params.code}, (err, foundVillage) => {
        if(err || !foundVillage){
            res.status(500).json({
                message: `Error: ${err}\nFetching Village with code ${req.params.code} failed`
            });
        }else{
            res.status(200).json(foundVillage);
        }
    });
}

//CREATE A NEW VILLAGE
exports.createVillage = (req,res,next) => {
    var village = new Village({
        code: req.body.code,
        district: req.body.district,
        island: req.body.island,
        type: req.body.type,
        name: req.body.name 
    });
    village.save((err, savedVillage) => {
        if(err){
            res.status(500).json({
                message: `Error: ${err}\nThere was an error saving the Village`
            });
        }else if(savedVillage){
            res.status(200).json({
                code: savedVillage.code
            });
        }else{
            res.status(500).json({
                message: `Error: There was an error saving the Village\nVillage created is Null/Undefined`
            });
        }
    });
}
//UPDATE EXISTING VILLAGE
exports.updateVillage = (req,res,next) => {
    var changes = req.body;
    Village.updateOne({code: req.params.code}, changes, (err, updatedVillage) => {
        if(err || !updatedVillage){
            res.status(500).json({
                message: `Error: ${err}\nThere was an error updating the Village`
            });
        }else{
            res.status(200).json({
                message: `Village Updated Successfully`,
                code: updatedVillage.code
            });
        }
    })
}

//DELETE A VILLAGE
exports.deleteVillage = (req,res,next) => {
    Village.deleteOne({code: req.params.code}, (err) => {
        if(err){
            res.status(500).json({
                message: `Error: ${err}\nThere was an error deleting the Village`
            });
        }else{
            res.status(200).json({
                message: `Village Deleted Successfully`
            });
        }
    })
}