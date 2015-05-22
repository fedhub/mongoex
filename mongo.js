var express    = require('express');
var mongo     = express.Router();
var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost:27017/mongo');
var userSchema = require('./user-schema').userSchema; // because object is exported and not a function
mongoose.model('UsersM', userSchema);

mongoose.connection.once('open', function(){
    var Users = this.model('UsersM'); // this = connection object
    // count: select * from Users where status=A or status=B
    var query = Users.find();

    query.where('status').in(['A', 'B']).count();

    query.exec(function(err, count){
        console.log("there are " + count + " users with A or B status");
    });

    query = Users.find(); // starts a new query search
    query.where('age').gt(21).limit(2).sort('name');
    query.exec(function(err, docs){
        console.log('\n Users over 21 years old: ');
        for(var i in docs){
            console.log(JSON.stringify(docs[i]));
        }
        mongoose.disconnect();
    });
});

module.exports = mongo;