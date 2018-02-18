const rp = require('request-promise');
const axios = require('axios');
const cheerio = require('cheerio');
const request = require('request');
const Website = require('../models/website.model.js');

exports.create = function(req, res) {
    if(!req.body.content) {
      res.status(400).send({message: "Website cannot be empty"});
    }


const queue = require('kue').createQueue(redisConfig);

queue.on('error', (err) => {
  console.error('There was an error!');
  console.error(err);
});

function createJob(data, done) {
  queue.create('newJob', data)
    .priority('critical')
    .on('completed', (result) => {
    console.log('Job is complete:', result);
    })
    .on('failed', (errorMessage) => {
    console.log('Job could not process');
    })
    .on('progress', (progress, data) => {
    console.log('\r  job #' + job.id + ' ' + progress + '% complete: ', data);
    })
    .save((err) => {
      if (err) {
        console.error(err);
        done(err);
      }
      if (!err) {
        res.send({
        message: 'Your job was created. Here is the job id: ' + job.id,
        success: true
      });
      }
    });
}

queue.process('newJob', (job, done) => {
  const data = job.data;
    request({
      method: 'GET',
      url: req.body.content
    }, function(err, response, body) {
      if (!err) return console.error(err);
      res.send(body);
        website.save(body)
        var website = new Website({content: response});

          // if(err) {
          //   console.log(err);
          //   res.status(500).send({message: "Some error occurred while creating the Website"});
          // }


    });

});
// module.exports = {
//   create: (data, done) => {
//     createJob(data, done);
//   }
// };




    //take the website from request and scrape the html
      // //save the result of scrape and jobId to database

      //   //save website to database

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