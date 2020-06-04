exports.isAuthenticated = (req,res,next) => {
    if(req.isAuthenticated()){
        return next();
    }
    res.status(401).send("You are not authorized to access this resource");
}

exports.userLoggedIn = (req, res, next) => {
    if(req.isAuthenticated() && !req.user.code){
        return next();
    }
    res.status(401).send("You are not authorized to access this resource");
} 

exports.userNotLoggedIn = (req, res, next) => {
    if(req.isAuthenticated() && !req.user.code){
        res.status(400).send("You are already Logged In!");
    }else if(req.isAuthenticated() && req.user.code){
        res.status(401).send("You are not authorized to access this resource");
    }
    next();
    
} 

exports.agentLoggedIn = (req, res, next) => {
    if(req.isAuthenticated() && req.user.code){
        return next();
    }
    res.status(401).send("You are not authorized to access this resource");
}

exports.agentNotLoggedIn = (req, res, next) => {
    if(req.isAuthenticated() && req.user.code){
        res.status(400).send("You are already Logged In!");
    }else if(req.isAuthenticated() && !req.user.code){
        res.status(401).send("You are not authorized to access this resource");
    }
    next();
}

exports.isAdmin = (req, res, next) => {
    if(req.isAuthenticated()){
        if(req.user.isAdmin){
            return next();
        }
    }
    res.status(401).send("You are not authorized to access this resource");
}

