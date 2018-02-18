'use strict';

const router = require('express').Router();
var websites = require('../controllers/website.controller.js');

module.exports = function(app) {
    // Create a new website
router.post('/', (req, res, next) => {
  const url = req.body;
  websites.create(url, (err) => {
    if (err) {
      return res.json({
        error: err,
        success: false,
        message: 'Could not create url',
      });
    } else {
      return res.json({
        error: null,
        success: true,
        message: 'Created a website!',
        url
      });
    }
  })
});
    // router.post('/', websites.create);
    // find website id
    router.get('/websites/:websiteId', websites.findOne);
}

