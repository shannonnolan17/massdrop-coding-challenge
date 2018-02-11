var express = require("express");
var bodyParser = require("body-parser");
var routes = require("./routes/routes.js");
var app = express();
const kue = require('kue')
const jobs = kue.createQueue({
  redis: process.env.REDIS_URL
})
const cheerio = require('cheerio');
const $ = cheerio.load('<body>...</body>');
var server = app.listen(3000, function () {
    console.log("app running on port.", server.address().port);
});

//Create a new job that when the user submits url to endpoint a job is created

function newJob (){
 var job = jobs.create('new_job', function (app) {
  //When "/" is called start request
    app.get("/", function(req, res) {
  //Request to scrape data from website
    request('https://www.google.com', function (error, response, html) {
      if (!error && response.statusCode == 200) {
        console.log(html);
      }
    });

    });
    };);
 //Save the job with job id to Redis database
 job.save();
}

//Process the jobs and give a status
jobs.process('new_job', function (job, done){
 console.log("Job", job.id, "is done");
 done && done();
})

//I would create another endpoint that a user could use to check the status of their job








