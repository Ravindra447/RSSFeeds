const rssModel = require('../models/rssFeedsModel');

const feedsUtils = require('../Utils/feedsProvider');

const InsertFeeds = async(cb) => {
    await feedsUtils.getRSSFeedsData((err, data) => {
        // console.log(data);
        rssModel.findOne({ feeds: "Feeds" }, (err, resultData) => {
            if (err) console.log(err);
            else {
                // console.log(resultData);
                if (!resultData) {
                    var insertObj = {
                        feeds: "Feeds",
                        source: data.sources
                    }
                    rssModel.create(insertObj, (err, result) => {
                        if (err) cb(false, { msg: err });
                        cb(null, { success: true, data: result, msg: "Data Inserted successfully." })
                    })
                } else {
                    var updateFields = {
                        source: data.sources,
                    }
                    rssModel.updateOne({ feeds: "Feeds" }, updateFields, (err, result) => {
                        if (err) cb(false, { msg: err });
                        cb(null, { success: true, data: result, msg: "Data Updated successfully." })
                    })
                }
            }
        })
    })

}
const getDataFromDB = async(cb) => {
    rssModel.findOne({ feeds: "Feeds" }, (err, resultData) => {
        if (err) console.log(err);
        else
            cb(null, resultData);

    });

}

module.exports = {
    InsertFeeds: InsertFeeds,
    getDataFromDB: getDataFromDB
}