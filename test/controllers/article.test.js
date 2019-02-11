
const app = require('../');
const request = require('supertest');
const sinon = require('sinon');
const {omit} = require('lodash');

require('should');

const MongooseHelper = require('../helpers/mongoose')

const ArticleService = require('../../src/services/article');


describe('Articles controller', () => {
    const newArticle = {
        "title": "A wonderful title",
        "text": "A very short text.",
        "tags": ["test", "foo", "bar", "baz"],
        "user": "5c5de02dd2c29712d4aa2fdd"
    };
    let mongoose;

    beforeEach(async() => {
        mongoose = await MongooseHelper.configure();
    });
    afterEach(() => {
        mongoose.connection.close();
    });

    context('POST /api/articles/', () => {

        it('responds 201 when a valid article is created', (done) => {
            request(app)
                .post('/api/articles')
                .set('Authorization', `Bearer ${process.env.AUTH_SECRET}`)
                .send(newArticle)
                .expect(201)
                .then(response => {
                    const articleCreated = response.body;
                    articleCreated.should.have.properties('_id', 'createdAt', 'updatedAt');
                    articleCreated.title.should.be.eql(newArticle.title);
                    articleCreated.text.should.be.eql(newArticle.text);
                    articleCreated.user.should.be.eql(newArticle.user);
                    articleCreated.tags.should.be.eql(newArticle.tags);
                    done();
                });
        });

        it('responds 400 when user is not specified', (done) => {
            request(app)
                .post('/api/articles')
                .set('Authorization', `Bearer ${process.env.AUTH_SECRET}`)
                .send(omit(newArticle, ['user']))
                .expect(400, done);
        });

        it('responds 400 when title is not specified', (done) => {
            request(app)
                .post('/api/articles')
                .set('Authorization', `Bearer ${process.env.AUTH_SECRET}`)
                .send(omit(newArticle, ['title']))
                .expect(400, done);
        });

        it('responds 401 when no Auth token specified', (done) => {
            request(app)
                .post('/api/articles')
                .send(newArticle)
                .expect(401, done);
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
                .set('Authorization', `Bearer ${process.env.AUTH_SECRET}`)
                .expect(404, done);
        });

        it('responds 401 when no Auth token specified', (done) => {
            request(app)
                .get('/api/articles/someRandomId')
                .expect(401, done);
        });
    });

    context('GET /api/articles', () => {

        it('responds 200 with empty array when there are no articles', (done) => {
            request(app)
                .get('/api/articles')
                .set('Authorization', `Bearer ${process.env.AUTH_SECRET}`)
                .expect(200)
                .then(response => {
                    response.body.should.be.empty();
                })
                .then(done);
        });

        it('responds 401 when no Auth token specified', (done) => {
            request(app)
                .get('/api/articles')
                .expect(401, done);
        });
    });

});
