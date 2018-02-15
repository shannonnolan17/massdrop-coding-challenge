const kue = require('kue');
app.use('./app/controllers/website.controller.js', kue.app);
