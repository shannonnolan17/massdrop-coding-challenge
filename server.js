var express = require('express');
var bodyParser = require('body-parser');
var kue = require('kue');
kue.app.listen(3000);

var app = express();

app.use(bodyParser.urlencoded({ extended: true }))

app.use(bodyParser.json())

var dbConfig = require('./config/database.config.js');

var mongoose = require('mongoose');

const db = mongoose.connect('mongodb://localhost:27017/massdrop');

mongoose.connection.once('open', function() {
    console.log("Successfully connected to the database");
})
mongoose.connection.on('error', function() {
    console.log('Could not connect to the database. Exiting now...');

});

// app.get('/active', function(req, res){
//     res.json({"message": "Welcome to the job queue"});
// });

require('./app/routes/website.routes.js')(app);

