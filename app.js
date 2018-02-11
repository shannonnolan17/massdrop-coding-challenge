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

//Create a new job that when the user submits to the url

function newJob (){
 var job = jobs.create('new_job', function (app) {
    app.get("/", function(req, res) {

    request('https://www.google.com', function (error, response, html) {
      if (!error && response.statusCode == 200) {
        console.log(html);
      }
    });

      // res.status(200).send(data);
    });
    };);
 job.save();
}

jobs.process('new_job', function (job, done){
 console.log("Job", job.id, "is done");
 done && done();
})


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));








