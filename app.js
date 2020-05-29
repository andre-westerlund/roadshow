const   express       = require("express"),
        app           = express(),
        bodyParser    = require("body-parser"),
        dotenv        = require('dotenv'),
        passport      = require("passport"),
        LocalStrategy = require("passport-local");
        
//APPLICATION CONFIG
dotenv.config();
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json({extended:true}));
app.use(require("express-session")({
    secret : EXPRESS_SESSION_SECRET,
    resave : false,
    saveUninitialized : false
}));

//DATABASE CONFIG
var mongoose = require('mongoose');
//Set up default mongoose connection
mongoose.connect(process.env.DATABASE, {useNewUrlParser: true, useUnifiedTopology: true,useFindAndModify:false, useCreateIndex: true});
//Get the default connection
var db = mongoose.connection;
//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.on('error', console.error.bind(console, 'MongoDB connection error:'));



//DEFINE ROUTES
const   userRoutes     = require("./routes/user"),
        leadRoutes     = require("./routes/lead"),
        agentRoutes    = require("./routes/agent"),
        villageRoutes  = require("./routes/village"),
        activityRoutes = require("./routes/activity"); 

app.use('/api/user', userRoutes);
app.use('/api/lead', leadRoutes);
app.use('/api/agent', agentRoutes);
app.use('/api/village', villageRoutes);
app.use('/api/activity', activityRoutes);

//LISTEN
app.listen(process.env.PORT, function(){
    console.log(`Roadshow App Started [${process.env.NODE_ENV} stage], listening on port: ${process.env.PORT}`);
})