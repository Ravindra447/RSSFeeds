const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');

const feedRoutes = require('./routes/feedRoutes');
const schedularRoutes = require('./routes/schedular');


const port = process.env.PORT || 9097;
const db = require('./config/db');

app.use(cors(), bodyParser.json(), bodyParser.urlencoded({ extended: false }))

mongoose.connect(db.dbUrl, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }, (err) => {
    if (err) throw err;
    else {
        console.log("Database Created");
    }
});

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use('/apis/v1', feedRoutes, schedularRoutes);
app.get('/', function(req, res) {
    res.render('index');
});
// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, 'www/index.html'))
// });
app.listen(port, () => {
    console.log('server running on :' + port);
});

module.exports = app;