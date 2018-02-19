'use strict';
module.exports = function(app) {
    // Create a new website
  const websites = require('../controllers/website.controller.js');
    app.post('/websites', function(req, res) {
      const content = req.body;
      websites.create(content, (err) => {
        if (err) {
          return res.json({
            error: err,
            success: false,
            message: 'Could not create content',
          });
        } else {
          return res.json({
            error: null,
            success: true,
            message: 'Created a website!', content
          });
        }
      })
    });

    // find website id
    app.get('/websites/:websiteId', websites.findOne);
}

