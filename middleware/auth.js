const User = require("../models/user");
const Agent = require("../models/agent");

exports.userLoggedIn = (req, res, next) => {
    if(req.isAuthenticated()){
        return next();
    }
    res.status(401).send("You are not authorized to access this resource");
} 

exports.userNotLoggedIn = (req, res, next) => {
    if(req.isAuthenticated()){
        res.status(400).send("You are already Logged In!");
    }
    next();
    
} 


exports.agentLoggedIn = (req, res, next) => {
    if(req.isAuthenticated()){
        return next();
    }
    res.status(401).send("You are not authorized to access this resource");
}

exports.isAdmin = (req, res, next) => {
    if(req.isAuthenticated()){
        if(req.user.isAdmin){
            return next();
        }
    }
    res.status(401).send("You are not authorized to access this resource");
}