exports.isAuthenticated = (req,res,next) => {
    if(req.isAuthenticated()){
        return next();
    }
    return res.status(401).send("You are not authorized to access this resource");
}

exports.userLoggedIn = (req, res, next) => {
    if(req.isAuthenticated() && !req.user.code){
        return next();
    }
    return res.status(401).send("You are not authorized to access this resource");
} 

exports.userNotLoggedIn = (req, res, next) => {
    if(req.isAuthenticated() && !req.user.code){
        return res.status(400).send("You are already Logged In!");
    }else if(req.isAuthenticated() && req.user.code){
        return res.status(401).send("You are not authorized to access this resource");
    }
    next();
    
} 

exports.agentLoggedIn = (req, res, next) => {
    if(req.isAuthenticated() && req.user.code){
        return next();
    }
    return res.status(401).send("You are not authorized to access this resource");
}

exports.agentNotLoggedIn = (req, res, next) => {
    if(req.isAuthenticated() && req.user.code){
        return res.status(400).send("You are already Logged In!");
    }else if(req.isAuthenticated() && !req.user.code && req.user.email != null){
        return res.status(401).send("You are not authorized to access this resource");
    }
    next();
}

exports.isAdmin = (req, res, next) => {
    if(req.isAuthenticated()){
        if(req.user.isAdmin){
            return next();
        }
    }
    return res.status(401).send("You are not authorized to access this resource");
}

