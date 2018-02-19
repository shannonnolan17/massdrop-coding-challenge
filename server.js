const express = require('express');
const bodyParser = require('body-parser');
const kue = require('kue');
const websites = require('./app/routes/website.routes.js')
const websitesController = require('./app/controllers/website.controller.js')
kue.app.listen(3000);

var app = express();

// app.use(bodyParser.urlencoded({ extended: true }))

// app.use(bodyParser.json())

// var dbConfig = require('./config/database.config.js');

const redis = require('redis');
const client = redis.createClient();
client.on('connect', () =>{
  console.log('Redis connection established');
})

// var mongoose = require('mongoose');

// const db = mongoose.connect('mongodb://localhost:27017/massdrop');

// mongoose.connection.once('open', function() {
//     console.log("Successfully connected to the database");
// })
// mongoose.connection.on('error', function() {
//     console.log('Could not connect to the database. Exiting now...');

// });

app.use('/websites', websites);


// require('./app/routes/website.routes.js')(app);

