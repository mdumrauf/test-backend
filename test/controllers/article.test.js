
const app = require('../');
const request = require('supertest');
const sinon = require('sinon');

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

});
