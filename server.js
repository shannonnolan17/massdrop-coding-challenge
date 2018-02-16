var express = require('express');
var bodyParser = require('body-parser');
var kue = require('kue');
var express = require('express');
var kueUiExpress = require('kue-ui-express');
var app = express();

kue.createQueue();

kueUiExpress(app, '/kue/', '/kue-api/');

app.use('/kue-api/', kue.app);

app.listen(3000);


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

app.get('/', function(req, res){
    res.json({"message": "Welcome to the job queue"});
});

require('./app/routes/website.routes.js')(app);

app.listen(3000, function(){
    console.log("Server is listening on port 3000");
});