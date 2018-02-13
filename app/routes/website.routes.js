module.exports = function(app) {

    var websites = require('../controllers/website.controller.js');

    // Create a new website
    app.post('/websites', websites.create);

    // find website id
    app.get('/websites/:websiteId', websites.findOne);
}