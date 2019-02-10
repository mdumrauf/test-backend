
const app = require('../');
const request = require('supertest');

const MongooseHelper = require('../helpers/mongoose');


describe('Users controller', () => {
    let mongoose;

    before(async() => {
        mongoose = await MongooseHelper.configure();
    });
    after(() => {
        mongoose.connection.close();
    });

    context('POST /api/users/', () => {

        it('responds 201 when a user is specified fully', (done) => {
            request(app)
                .post('/api/users')
                .send({
                    "name": "John Doe",
                    "avatar": "http://foo.bar/image.png"
                })
                .expect(201, done);
        });

        it('responds 400 when name is not specified', (done) => {
            request(app)
                .post('/api/users')
                .send({
                    "avatar": "http://foo.bar/image.png"
                })
                .expect(400, done);
        });

    });

});
