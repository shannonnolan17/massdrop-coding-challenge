const kue = require('kue');
const queue = kue.createQueue({
  redis: process.env.REDIS_URL
});
var request = require('request');
var cheerio = require('cheerio');
var Website = require('../models/website.model.js');

exports.create = function(req, res) {
    // Create and Save a new Website
    if(!req.body.content) {
      res.status(400).send({message: "Website cannot be empty"});
    }

    var site = {content: req.body.title};
    //take the request and add to job queue
    function newJob (){
     var job = jobs.create(site);
     job.save();
    }
    jobs.process(site, function (job, done){
     console.log("Job", job.id, "is done");
     done && done();
    });

    //take the website from request and scrape the html
    var options = {
      uri: site,
      transform: function (body) {
        return cheerio.load(body);
      }
    };
    rp(options)
      .then(($) => {
        console.log($);
      })
      .catch((err) => {
        console.log(err);
    });

    //save the result of scrape and jobId to database
    var website = new Website({content: options, jobId: job.id});

    //save website to database
    website.save(function(err, data) {
      console.log(data);
      if(err) { //error handling
        console.log(err);
        res.status(500).send({message: "Some error occurred while creating the Website"});
      } else {
        res.send(data);
      }
    });
};


exports.findOne = function(req, res) {
    // Find a single Website with an id
    Website.findById(req.params.websiteId, function(err, data) {
      if(err) {
        res.status(500).send({message: "Could not retrieve website status with id " + req.params.websiteId});
      } else {
        res.send(data);
      }
    });

};