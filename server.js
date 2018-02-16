// var express = require('express');
// var bodyParser = require('body-parser');
// var kue = require('kue');
// kue.app.listen(3000);

// var app = express();

// app.use(bodyParser.urlencoded({ extended: true }))

// app.use(bodyParser.json())

// var dbConfig = require('./config/database.config.js');



var app = require('express')();
var responseTime = require('response-time')
var axios = require('axios');
var redis = require('redis');

// create a new redis client and connect to our local redis instance
var client = redis.createClient();

// if an error occurs, print it to the console
client.on('error', function (err) {
    console.log("Error " + err);
});

app.set('port', (process.env.PORT || 5000));

// set up the response-time middleware
app.use(responseTime());

// if a user visits /api/facebook, return the total number of stars 'facebook'
// has across all it's public repositories on GitHub
app.get('/', function(req, res) {

});

app.listen(app.get('port'), function(){
  console.log('Server listening on port: ', app.get('port'));
});

// var mongoose = require('mongoose');

// const db = mongoose.connect('mongodb://localhost:27017/massdrop');

// mongoose.connection.once('open', function() {
//     console.log("Successfully connected to the database");
// })
// mongoose.connection.on('error', function() {
//     console.log('Could not connect to the database. Exiting now...');

// });

// app.get('/', function(req, res){
//     res.json({"message": "Welcome to the job queue"});
// });

// require('./app/routes/website.routes.js')(app);

// app.listen(3000, function(){
//     console.log("Server is listening on port 3000");
// });