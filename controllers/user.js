const User = require("../models/user");

//GET ALL USERS
exports.getUsers = (req, res, next) => {
    User.find({}).then(users => {
        res.status(200).json(users);
    }).catch(err => {
        res.status(500).json(err);
    });
}

//GET USER
// /api/user/:id
exports.getUser = (req,res,next) => {
    User.findOne({_id : req.params.id}).then(foundUser => {
        res.status(200).json(foundUser);
    }).catch(err => {
        res.status(500).json(err);
    })
}

//UPDATE USER
// /api/user/:id
exports.updateUser = (req,res,next) => {
    var changes = req.body;
    User.updateOne({_id: req.params.id}, changes).then(updatedUser => {
        res.status(200).json({message: "User Updated Successfully"})
    }).catch(err => {
        res.status(500).json(err);
    })
}

//DELETE USER
// /api/user/:id
exports.deleteUser = (req, res, next) => {
    User.deleteOne({_id: req.params.id}).then(function(){
        res.status(200).json({message: "User Deletion Success"});               
    }).catch(err => {
        res.status(500).json(err);
    })
}

//LOGIN USER
// POST /api/user/auth/login
exports.login = (req,res,next) => {
    res.status(200).json({message: "Login Success!", user: req.user})
}

//LOGOUT USER
// GET /api/user/auth/logout
exports.logout = (req,res,next) => {
    req.logout();
    res.status(200).json({success: true, message: "Logout Success!"})
}

//REGISTER USER
// POST /api/user/auth/register
exports.register = (req,res,next) => {
    var user = new User({
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName
    });
    if(req.body.isAdmin == "true") user.isAdmin = true;
    User.register(user, req.body.password, (err, registeredUser) => {
        if(err){
            res.status(500).json({message:"There was an error creating the User", error: err})
        }else{
             res.status(200).json(registeredUser._id);
        }
    });
}