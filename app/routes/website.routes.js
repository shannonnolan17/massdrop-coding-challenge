'use strict';
const rp = require('request-promise');
const axios = require('axios');
const cheerio = require('cheerio');
const request = require('request');
const Website = require('../models/website.model.js');


var router = require('express').Router();
  // Create a new website
  // const websites = require('../controllers/website.controller.js');
  router.post('/api', function (req, res) {
   // let redisConfig;
   //  if (process.env.NODE_ENV === 'production') {
   //    redisConfig = {
   //      redis: {
   //        port: process.env.REDIS_PORT,
   //        host: process.env.REDIS_HOST,
   //        auth: process.env.REDIS_PASS,
   //        options: {
   //          no_ready_check: false
   //        }
   //      }
   //    };
   //  } else {
   //    redisConfig = {};
   //  }
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
        .on('completed', (result) => {
        res.send('Job is complete:', result);
        })
        .on('failed', (errorMessage) => {
        res.send('Job could not process');
        })
        .on('progress', (progress, data) => {
        res.send('\r  job #' + job.id + ' ' + progress + '% complete: ', data);
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

    // queue.process('newJob', (job, done) => {
    //   const data = job.data;
    //     request({
    //       method: 'GET',
    //       url: req.body.content
    //     }, function(err, response, body) {
    //       if (!err) return console.error(err);
    //       res.send(body);
    //         website.save(body)
    //         var website = new Website({content: response});

    //           // if(err) {
    //           //   console.log(err);
    //           //   res.status(500).send({message: "Some error occurred while creating the Website"});
    //           // }


    //     });

    // });
  })

    // find website id
    // router.get('/api/:websiteId', websites.findOne);


module.exports = router

