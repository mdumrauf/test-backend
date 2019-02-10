
const app = require('../');
const request = require('supertest');

const sinon = require('sinon');

const ArticleService = require('../../src/services/article');


describe('Articles controller', () => {

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
