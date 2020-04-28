const express = require('express');
const routes = express.Router();

const feedController = require('../Controller/feedsController');

routes.get('/getRssFeeds', feedController.getFeedFromRSS);

routes.get('/getRssFeedsAndInsertIntoDB', feedController.InsertFeedsIntoDB);



module.exports = routes;