const mongoose = require('mongoose');

const model = mongoose.Schema({
    feedsType: {
        type: String
    },
    feedsLink: {
        type: String
    },
    description: {
        type: String
    },
    lastBuildDate: {
        type: String
    },
    feeds: [{
        title: {
            type: String
        },
        description: {
            type: String
        },
        updatedOn: {
            type: String
        }
    }]

})
var Feeds = mongoose.model('feedLinkData', model);

module.exports = Feeds;