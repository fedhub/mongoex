var express    = require("express");
var app        = express();
var server     = require('http').createServer(app);
var path       = require('path');
var bodyParser = require('body-parser');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// use middleware
app.use(express.static(path.join(__dirname, 'includes')));
app.use(bodyParser.urlencoded({ extended: false }));

// define routes
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
    next();
});

// MONGO

// Retrieve
var MongoClient = require('mongodb').MongoClient;

// Connect to the db
MongoClient.connect("mongodb://localhost:27017/mongo", function(err, db) {
    if(!err) {
        console.log("We are connected");
        db.createCollection("users", function(err, collection){
            collection.insert({"name":"shimon"});
            console.log("Collection name: "+collection.collectionName);
        });
    }
    else{console.log('not');}
});

// MONGO

app.use(require('./routers'));

var port = process.env.PORT || 3000;
server.listen(port, function(){
    console.log("app http ready on port "+port);
});