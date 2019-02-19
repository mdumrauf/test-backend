
const app = require('../');
const request = require('supertest');
const sinon = require('sinon');
const {omit} = require('lodash');

const MongooseHelper = require('../helpers/mongoose');

const ArticleService = require('../../src/services/article');


describe('Articles controller', () => {
    const newArticle = {
        'title': 'A wonderful title',
        'text': 'A very short text.',
        'tags': ['test', 'foo', 'bar', 'baz'],
        'user': '5c5de02dd2c29712d4aa2fdd'
    };
    const article1 = {
        'title': 'A wonderful title',
        'text': 'A very short text.',
        'user': '5c5de02dd2c29712d4aa2fdd',
        'tags': ['test', 'foo', 'bar', 'baz']
    };
    const article2 = {
        'title': 'Another title',
        'text': 'Some text.',
        'user': '5c5de02dd2c29712d4aa2fdd',
        'tags': ['bar', 'baz']
    };
    const article3 = {
        'title': 'Yet one more title',
        'text': 'Has some text too.',
        'user': '5c5de02dd2c29712d4aa2fdd',
        'tags': ['qux']
    };

    let mongoose;

    beforeEach(async() => {
        mongoose = await MongooseHelper.configure();
    });
    afterEach(() => {
        mongoose.connection.close();
    });

    context('POST /api/articles/', () => {

        it('responds 201 when a valid article is created', async() => {
            const {body, statusCode} = await request(app)
                .post('/api/articles')
                .set('Authorization', `Bearer ${process.env.AUTH_SECRET}`)
                .send(newArticle);

            statusCode.should.be.eql(201);

            body.should.have.properties('_id', 'createdAt', 'updatedAt');
            body.title.should.be.eql(newArticle.title);
            body.text.should.be.eql(newArticle.text);
            body.user.should.be.eql(newArticle.user);
            body.tags.should.be.eql(newArticle.tags);
        });

        it('responds 400 when user is not specified', async() => {
            const {statusCode} = await request(app)
                .post('/api/articles')
                .set('Authorization', `Bearer ${process.env.AUTH_SECRET}`)
                .send(omit(newArticle, ['user']));
            statusCode.should.be.eql(400);
        });

        it('responds 400 when title is not specified', async() => {
            const {statusCode} = await request(app)
                .post('/api/articles')
                .set('Authorization', `Bearer ${process.env.AUTH_SECRET}`)
                .send(omit(newArticle, ['title']));
            statusCode.should.be.eql(400);
        });

        it('responds 401 when no Auth token specified', async() => {
            const {statusCode} = await request(app)
                .post('/api/articles')
                .send(newArticle);
            statusCode.should.be.eql(401);
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

        it('responds 404 when it does not exist', async() => {
            stubFindById.returns(null);

            const {statusCode} = await request(app)
                .get('/api/articles/someRandomId')
                .set('Authorization', `Bearer ${process.env.AUTH_SECRET}`);

            statusCode.should.be.eql(404);
        });

        it('responds 401 when no Auth token specified', async() => {
            const {statusCode} = await request(app)
                .get('/api/articles/someRandomId');

            statusCode.should.be.eql(401);
        });
    });


    context('PATCH /api/articles/:id', () => {
        it('responds 404 when it does not exist', async() => {
            const {statusCode} = await request(app)
                .patch('/api/articles/someRandomId')
                .set('Authorization', `Bearer ${process.env.AUTH_SECRET}`)
                .send({'name': 'Some title'});

            statusCode.should.be.eql(404);
        });
    });


    context('DELETE /api/articles/:id', () => {
        it('responds 204 when it successfully deletes an article', async() => {
            const newArt1 = await ArticleService.create(article1);
            const {statusCode} = await request(app)
                .delete(`/api/articles/${newArt1._id}`)
                .set('Authorization', `Bearer ${process.env.AUTH_SECRET}`);

            statusCode.should.be.eql(204);
        });
        it('responds 404 when it does not exist', async() => {
            const {statusCode} = await request(app)
                .delete('/api/articles/someRandomId')
                .set('Authorization', `Bearer ${process.env.AUTH_SECRET}`);

            statusCode.should.be.eql(404);
        });
    });

    context('GET /api/articles', () => {
        it('responds 200 with empty array when there are no articles', async() => {
            const {body, statusCode} = await request(app)
                .get('/api/articles')
                .set('Authorization', `Bearer ${process.env.AUTH_SECRET}`);
            statusCode.should.be.eql(200);
            body.should.be.empty();
        });

        it('responds 200 with an array with 2 elements when tags are specified', async() => {
            const newArt1 = await ArticleService.create(article1);
            const newArt2 = await ArticleService.create(article2);
            await ArticleService.create(article3);

            const {body, statusCode} = await request(app)
                .get('/api/articles?tags=foo,bar,baz')
                .set('Authorization', `Bearer ${process.env.AUTH_SECRET}`);
            statusCode.should.be.eql(200);

            body.should.have.lengthOf(2);
            body[0]._id.should.be.eql(newArt1.id);
            body[1]._id.should.be.eql(newArt2.id);
        });

        it('responds 401 when no Auth token specified', async() => {
            const {statusCode} = await request(app)
                .get('/api/articles');
            statusCode.should.be.eql(401);
        });
    });

});
