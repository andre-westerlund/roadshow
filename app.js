const   express       = require("express"),
        app           = express(),
        bodyParser    = require("body-parser"),
        cookieParser  = require("cookie-parser"),
        dotenv        = require('dotenv'),
        passport      = require("passport"),
        cors          = require("cors"),
        session       = require("express-session"),
        FileStore     = require("session-file-store")(session),
        auth          = require("./middleware/auth"),
        LocalStrategy = require("passport-local").Strategy;

//MODELS FOR AUTHENTICATION
const User = require("./models/user");
const Agent = require("./models/agent");
        
//APPLICATION CONFIG
dotenv.config();
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json({extended:true}));
app.use(cors({credentials: true}));
var MemoryStore = session.MemoryStore;
app.use(cookieParser());
app.use(session({
    secret : process.env.EXPRESS_SESSION_SECRET,
    name: process.env.COOKIE,
    resave : false,
    saveUninitialized : false,
    store: new MemoryStore()
}));
app.use(passport.initialize());
app.use(passport.session());

//PASSPORT CONFIG
passport.use('agentLocal', new LocalStrategy(Agent.authenticate()));
passport.use('userLocal', new LocalStrategy(User.authenticate()));
passport.serializeUser((user, done) => { 
    done(null, user);
});
passport.deserializeUser((user, done) => {
    if(user != null){
       done(null,user);
    }
});

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
        activityRoutes = require("./routes/activity"),
        mtalaActivityRoutes = require("./routes/mtala-activity"); 

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});

app.use('/api/user', userRoutes);
app.use('/api/lead', leadRoutes);
app.use('/api/agent', agentRoutes);
app.use('/api/village', villageRoutes);
app.use('/api/activity', activityRoutes);
app.use('/api/mtala', mtalaActivityRoutes);

app.use('/', (req,res) => {
    res.status(404).send("The resource you are requesting cannot be found")
})

//LISTEN
app.listen(process.env.PORT, function(){
    console.log(`Roadshow App Started [${process.env.NODE_ENV} stage], listening on port: ${process.env.PORT}`);
})