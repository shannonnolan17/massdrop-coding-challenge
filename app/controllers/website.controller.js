var Website = require('../models/website.model.js');

exports.create = function(req, res) {
    // Create and Save a new Website
    if(!req.body.content) {
        res.status(400).send({message: "Note can not be empty"});
    }
    var note = new Note({title: req.body.title || "Untitled Note", content: req.body.content});

    note.save(function(err, data) {
        console.log(data);
        if(err) {
            console.log(err);
            res.status(500).send({message: "Some error occurred while creating the Note."});
        } else {
            res.send(data);
        }
    });

};

exports.findOne = function(req, res) {
    // Find a single Website with a JobId

};
