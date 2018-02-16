const rp = require('request-promise');
const axios = require('axios');
const cheerio = require('cheerio');
const request = require('request');
var Website = require('../models/website.model.js');


exports.create = function(req, res) {
    if(!req.body.content) {
      res.status(400).send({message: "Website cannot be empty"});
    }

    var site = {content: req.body.content};
    //take the request and add to job queue

if (process.env.NODE_ENV === 'production') {
  redisConfig = {
    redis: {
      port: process.env.REDIS_PORT,
      host: process.env.REDIS_HOST,
      auth: process.env.REDIS_PASS
    }
  };
} else {
  redisConfig = {};
}

const queue = require('kue').createQueue(redisConfig);


queue.on('ready', () => {
  console.info('Queue is ready!');
});

queue.on('error', (err) => {
  console.error('There was an error!');
  console.error(err);
});
function createJob(data, done) {
  queue.create('newJob', data)
    .priority('critical')
    .attempts(8)
    .backoff(true)
    .removeOnComplete(false)
    .save((err) => {
      if (err) {
        console.error(err);
        done(err);
      }
      if (!err) {
        done();
      }
    });
}

queue.process('newJob', (job, done) => {
  // This is the data we sent into the #create() function call earlier
  // We're setting it to a constant here so we can do some guarding against accidental writes
  const data = job.data;
    request({
      method: 'GET',
      url: data
    }, function(err, response, body) {
      if (err) return console.error(err);
      res.send(body);

    });
  //... do other stuff with the data.
});
module.exports = {
  create: (data, done) => {
    createJob(data, done);
  }
};




    //take the website from request and scrape the html
      // //save the result of scrape and jobId to database
      //   var website = new Website({content: req.body.content});

      //   //save website to database
      //   website.save(function(err, data) {
      //     res.send({message: "Your id is " + website.id})
      //     if(err) { //error handling
      //       console.log(err);
      //       res.status(500).send({message: "Some error occurred while creating the Website"});
      //     }
      //   });

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