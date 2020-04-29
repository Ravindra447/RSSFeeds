const express = require('express');
const routes = express.Router();

const schedularController = require('../Controller/feedsController');
var schedule = require('node-schedule');

var rule = new schedule.RecurrenceRule();
rule.minute = 38;
// var j = schedule.scheduleJob('*/2 * * * *', function() {
var j = schedule.scheduleJob(rule, function() {
    schedularController.InsertFeedsIntoDBWithSchedular(result => {
        console.log(result.msg)
    })

});

module.exports = routes;