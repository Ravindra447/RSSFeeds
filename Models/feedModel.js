const mongoose = require('mongoose');

const model = mongoose.Schema({
    Feed: {
        type: String
    },
    feedType: {
        type: String
    }
})
var Feeds = mongoose.model('feed', model);

module.exports = Feeds;