const rssModel = require('../models/rssFeedsModel');

const FeedModel = require('../models/feedModel');

const FeedLinkModel = require('../models/feedFromLinkModel');


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

const PostFeeds = async(data, cb) => {
    // console.log(data);

    FeedModel.findOne({ Feed: data.Feed, feedType: data.feedType }, (err, resultData) => {
        if (err) console.log(err);
        else {
            if (!resultData) {
                FeedModel.create(data, (err, result) => {
                    if (err) cb(false, { msg: err });
                    cb(null, { success: true, data: result, msg: "Data Inserted successfully." })
                })
            } else {
                cb(null, { success: false, msg: "Feed already exits." })
            }
        }
    })

}
const GetFeeds = async(cb) => {
    // console.log(data);

    FeedModel.find({}, (err, resultData) => {
        if (err) console.log(err);
        else {
            cb(null, { success: true, data: resultData, msg: "Data retrived successfully." })
        }
    })

}
const PostFeedsFromLink = async(data, cb) => {
    // console.log(data);
    feedsUtils.getRSSFeedsUsingLink(data, (err, feedsData) => {

        FeedLinkModel.findOne({ feedsLink: feedsData.feedsLink }, (err, resultData) => {
            if (err) console.log(err);
            else {
                if (!resultData) {
                    FeedLinkModel.create(feedsData, (err, result) => {
                        if (err) cb(false, { msg: err });
                        cb(null, { success: true, data: result, msg: "Data Inserted successfully." })
                    })
                } else {
                    var updateFields = {
                        feedsType: feedsData.feedsType,
                        lastBuildDate: feedsData.lastBuildDate,
                        description: feedsData.description,
                        feeds: feedsData.feeds
                    }
                    FeedLinkModel.updateOne({ feedsLink: feedsData.feedsLink }, updateFields, (err, result) => {
                        if (err) cb(false, { msg: err });
                        cb(true, { success: true, data: feedsData, msg: "Data Updated successfully" })
                    })
                }
            }
        })
    })

}

module.exports = {
    InsertFeeds: InsertFeeds,
    getDataFromDB: getDataFromDB,
    PostFeeds: PostFeeds,
    GetFeeds: GetFeeds,
    PostFeedsFromLink: PostFeedsFromLink
}