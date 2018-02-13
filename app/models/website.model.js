var mongoose = require('mongoose');

var WebsiteSchema = mongoose.Schema({
    title: String,
    content: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Website', WebsiteSchema);