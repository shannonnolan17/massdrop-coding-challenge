module.exports = function(app) {

    var websites = require('../controllers/note.controller.js');

    // Create a new Note
    app.post('/websites', websites.create);

    // Retrieve all website
    app.get('/websites', websites.findAll);

    // Retrieve a single Note with noteId
    app.get('/websites/:websiteId', websites.findOne);

    // Update a Note with noteId
    app.put('/websites/:websiteId', websites.update);

    // Delete a Note with noteId
    app.delete('/websites/:websiteId', websites.delete);
}