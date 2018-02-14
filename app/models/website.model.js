var mongoose = require('mongoose');

var WebsiteSchema = mongoose.Schema({
    content: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Website', WebsiteSchema);