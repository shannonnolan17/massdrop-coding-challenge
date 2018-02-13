var mongoose = require('mongoose');

var WebsiteSchema = mongoose.Schema({
    content: String,
    jobId: Number
}, {
    timestamps: true
});

module.exports = mongoose.model('Website', WebsiteSchema);