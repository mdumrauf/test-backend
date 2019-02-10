
const app = require('../');
const request = require('supertest');
const sinon = require('sinon');
require('should');

const MongooseHelper = require('../helpers/mongoose')

const ArticleService = require('../../src/services/article');


describe('Articles controller', () => {
    let mongoose;

    before(async() => {
        mongoose = await MongooseHelper.configure();
    });
    after(() => {
        mongoose.connection.close();
    });

    context('POST /api/articles/', () => {

        it('responds 400 when user is not specified', (done) => {
            request(app)
                .post('/api/articles')
                .send({
                    "title": "A wonderful title",
                    "text": "A very short text.",
                    "tags": ["test", "foo", "bar", "baz"]
                })
                .expect(400, done);
        });

        it('responds 400 when title is not specified', (done) => {
            request(app)
                .post('/api/articles')
                .send({
                    "text": "A very short text.",
                    "tags": ["test", "foo", "bar", "baz"],
                    "user": "5c5de02dd2c29712d4aa2fdd"
                })
                .expect(400, done);
        });

    });

    context('GET /api/articles/:id', () => {
        let stubFindById;

        beforeEach(() => {
            stubFindById = sinon.stub(ArticleService, 'findById');
        });

        afterEach(() => {
            stubFindById.restore();
        });

        it('responds 404 when it does not exist', (done) => {
            stubFindById.returns(null);

            request(app)
                .get('/api/articles/someRandomId')
                .expect(404, done);
        });

    });

    context('GET /api/articles', () => {

        it('responds 200 with empty array when there are no articles', (done) => {
            request(app)
                .get('/api/articles')
                .expect(200)
                .then(response => {
                    response.body.should.be.empty();
                })
                .then(done);
        });

    });

});
