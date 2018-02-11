var express = require("express");
var bodyParser = require("body-parser");
var routes = require("./routes/routes.js");
var app = express();
const kue = require('kue')
const jobs = kue.createQueue({
  redis: process.env.REDIS_URL
})

function newJob (){
 var job = jobs.create('new_job');
 job.save();
}

jobs.process('new_job', function (job, done){
 console.log("Job", job.id, "is done");
 done && done();
})

setInterval(newJob, 3000);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

routes(app);



