
const app = require('../');
const request = require('supertest');
const {omit} = require('lodash');

const MongooseHelper = require('../helpers/mongoose');


describe('Users controller', () => {
    const newUser = {
        "name": "John Doe",
        "avatar": "http://foo.bar/image.png"
    };
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
                .set('Authorization', `Bearer ${process.env.AUTH_SECRET}`)
                .send(newUser)
                .expect(201, done);
        });

        it('responds 400 when name is not specified', (done) => {
            request(app)
                .post('/api/users')
                .set('Authorization', `Bearer ${process.env.AUTH_SECRET}`)
                .send(omit(newUser, ['name']))
                .expect(400, done);
        });

        it('responds 401 when no Auth token specified', (done) => {
            request(app)
                .post('/api/users')
                .send(newUser)
                .expect(401, done);
        });
    });

});
