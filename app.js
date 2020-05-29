const   express    = require("express"),
        bodyParser = require("body-parser"),
        dotenv     = require('dotenv');
        
dotenv.config();
var mongoose = require('mongoose');
//Set up default mongoose connection
mongoose.connect(process.env.DATABASE, {useNewUrlParser: true, useUnifiedTopology: true,useFindAndModify:false, useCreateIndex: true});
    //Get the default connection
var db = mongoose.connection;
//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json({extended:true}));

//DEFINE MODELS



//DEFINE ROUTES


//LISTEN
app.listen(process.env.PORT, function(){
    console.log(`Roadshow App Started [${process.env.NODE_ENV} stage], listening on port: ${process.env.PORT}`);
})