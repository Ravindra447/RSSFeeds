var chai = require('chai');
var chaiHttp = require('chai-http');
var app = require('../server');

chai.use(chaiHttp);
chai.should();

describe('TESTING RSS Feeds', () => {

    it('Testing /getRssFeeds ', (done) => {
        chai.request(app)
            .get('/apis/v1/getRssFeeds')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('msg');
                res.body.msg.should.be.eql('Data retrived successfully.');
                done();
            });
    });

    it('Testing /getRssFeedsAndInsertIntoDB ', (done) => {
        chai.request(app)
            .get('/apis/v1/getRssFeedsAndInsertIntoDB')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('msg');
                res.body.should.have.property('status');
                res.body.status.should.be.eql(true);
                done();
            });
    });

});