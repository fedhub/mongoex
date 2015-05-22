var express    = require('express');
var mongoose = require('mongoose');
var schema = mongoose.Schema;

var userSchema = new schema({
    name: {type: String, index: 1, unique: true, required: true},
    age: Number,
    status: {type: String, required: true},
    groups: [String]
}, {collection: 'users'});

exports.userSchema = userSchema;
