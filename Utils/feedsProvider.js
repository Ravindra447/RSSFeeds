const axios = require('axios');
const convert = require('xml-js');

const getRSSFeedsData = (cb) => {
    axios({
            method: 'get',
            url: 'https://newsapi.org/v2/sources?language=en&apiKey=3267ae0517df4a719e7d8f1baff1491e',
        })
        .then(function(response) {
            cb(null, response.data)
        });
}

const getRSSFeedsUsingLink = (data, cb) => {
    axios({
            method: 'get',
            url: data.feedLink,
        })
        .then(function(response) {
            // console.log(response.data);
            let result = convert.xml2json(response.data, { compact: true, spaces: 4 });

            // console.log(JSON.parse(result))
            // console.log(result)
            let Feeds = [];
            let FeedsArray = JSON.parse(result).rss.channel.item;
            FeedsArray.forEach(feed => {
                if (feed.description && feed.description['_text']) {
                    // console.log(feed.description['_text'])
                    // removeTags(feed.description['_text'])
                    feed.description['_text'] = removeTags(feed.description['_text']);
                    if (feed.description['_text'].trim != "") {
                        Feeds.push({
                            title: feed.title['_text'],
                            description: feed.description['_text'],
                            updatedOn: feed.pubDate['_text']
                        })
                    }
                }

            });
            let obj = {
                feedsType: JSON.parse(result).rss.channel.title['_text'],
                feedsLink: JSON.parse(result).rss.channel.link['_text'],
                lastBuildDate: JSON.parse(result).rss.channel.lastBuildDate ? JSON.parse(result).rss.channel.lastBuildDate['_text'] != "" ? JSON.parse(result).rss.channel.lastBuildDate['_text'] : null : null,
                description: JSON.parse(result).rss.channel.description['_text'],
                feeds: Feeds
            }

            cb(null, obj)
        });
}

function removeTags(str) {
    if ((str === null) || (str === ''))
        return false;
    else
        str = str.toString();
    return str.replace(/(<([^>]+)>)/ig, '');
}
module.exports = {
    getRSSFeedsData: getRSSFeedsData,
    getRSSFeedsUsingLink: getRSSFeedsUsingLink
}