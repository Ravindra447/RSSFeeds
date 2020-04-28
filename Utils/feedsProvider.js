const axios = require('axios');

const getRSSFeedsData = (cb) => {
    axios({
            method: 'get',
            url: 'https://newsapi.org/v2/sources?language=en&apiKey=3267ae0517df4a719e7d8f1baff1491e',
        })
        .then(function(response) {
            // console.log(response);
            cb(null, response.data)
        });
}

module.exports = {
    getRSSFeedsData: getRSSFeedsData,
}