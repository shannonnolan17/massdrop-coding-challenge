'use strict';

var router = require('express').Router();
  // Create a new website
  const websites = require('../controllers/website.controller.js');
  router.post('/api', (req, res, next) => {
    // const content = req.body.content;
    // websites.create(content, (err) => {
    //   if (err) {
    //     return res.json({
    //       error: err,
    //       success: false,
    //       message: 'Could not create content',
    //     });
    //   } else {
    //     return res.json({
    //       error: null,
    //       success: true,
    //       message: 'Created a website!', content
    //     });
    //   }
    // })
  });

    // find website id
    router.get('/api/:websiteId', websites.findOne);


module.exports = router

