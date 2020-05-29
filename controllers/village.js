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

//CREATE A NEW VILLAGE
exports.createVillage = (req,res,next) => {

}