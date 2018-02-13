var Website = require('../models/website.model.js');

exports.create = function(req, res) {
    // Create and Save a new Website
    if(!req.body.content) {
      res.status(400).send({message: "Website cannot be empty"});
    }
    var website = new Website({content: req.body.title || "Untitled Website", jobId: req.body.content});

    website.save(function(err, data) {
      console.log(data);
      if(err) {
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
