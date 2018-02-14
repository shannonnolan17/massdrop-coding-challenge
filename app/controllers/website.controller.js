const kue = require('kue');
const jobs = kue.createQueue();
const rp = require('request-promise');
const axios = require('axios');
const cheerio = require('cheerio');
const request = require('request');
var Website = require('../models/website.model.js');

exports.create = function(req, res) {
    // Create and Save a new Website
    if(!req.body.content) {
      res.status(400).send({message: "Website cannot be empty"});
    }

    var site = {content: req.body.content};
    //take the request and add to job queue
    function newJob (){
     var job = jobs.create(req.body.content);
     job.save();
    }
    jobs.process(site, function (job, done){
     console.log("Job", job.id, "is done");
     done && done();
    });

    //take the website from request and scrape the html
      request({
        method: 'GET',
        url: req.body.content
      }, function(err, response, body) {
        if (err) return console.error(err);
        console.log(body);

      });
      //save the result of scrape and jobId to database
        var website = new Website({content: req.body.content});

        //save website to database
        website.save(function(err, data) {
          res.send({message: "Your id is " + website.id})
          if(err) { //error handling
            console.log(err);
            res.status(500).send({message: "Some error occurred while creating the Website"});
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