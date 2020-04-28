const mongoose = require('mongoose');

const model = mongoose.Schema({
    feeds: {
        type: String,
        default: "Feeds"
    },
    source: [{
        id: {
            type: String
        },
        name: String,
        description: String,
        url: String,
        category: String,
        language: String,
        country: String
    }]

})
var Feeds = mongoose.model('rssFeed', model);

module.exports = Feeds;