const dataService = require('../services/feedsServices');


const getFeedFromRSS = async(req, res) => {
    await dataService.getDataFromDB((err, result) => {
        if (err) console.log(err);
        if (result) {
            console.log("hited");
            res.status(200);
            res.json({ status: true, msg: "Data retrived successfully.", result: result })
        } else {
            res.status(500);
            res.json({ status: false, msg: "Data retrived failed." })
        }
    })
}
const InsertFeedsIntoDB = async(req, res) => {
    await dataService.InsertFeeds((err, result) => {
        if (err) console.log(err);
        if (result.success) {
            res.status(200);
            res.json({ status: true, msg: result.msg })
        } else {
            res.status(500);
            res.json({ status: false, msg: "Data Inserted failed." })
        }
    })
}
const InsertFeedsIntoDBWithSchedular = async(cb) => {
    await dataService.InsertFeeds((err, result) => {
        if (err) console.log(err);
        if (result.success) {
            cb({ status: true, msg: result.msg })
        } else {
            cb({ status: false, msg: "Data Inserted failed." })
        }
    })
}
module.exports = {
    getFeedFromRSS: getFeedFromRSS,
    InsertFeedsIntoDB: InsertFeedsIntoDB,
    InsertFeedsIntoDBWithSchedular: InsertFeedsIntoDBWithSchedular
}