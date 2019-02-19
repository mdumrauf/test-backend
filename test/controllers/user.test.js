
const app = require('../');
const request = require('supertest');
const {omit} = require('lodash');

const MongooseHelper = require('../helpers/mongoose');


describe('Users controller', () => {
    const newUser = {
        'name': 'John Doe',
        'avatar': 'http://foo.bar/image.png'
    };
    let mongoose;

    before(async() => {
        mongoose = await MongooseHelper.configure();
    });
    after(() => {
        mongoose.connection.close();
    });

    context('POST /api/users/', () => {

        it('responds 201 when a user is specified fully', async() => {
            const {statusCode} = await request(app)
                .post('/api/users')
                .set('Authorization', `Bearer ${process.env.AUTH_SECRET}`)
                .send(newUser);
            statusCode.should.be.eql(201);
        });

        it('responds 400 when name is not specified', async() => {
            const {statusCode} = await request(app)
                .post('/api/users')
                .set('Authorization', `Bearer ${process.env.AUTH_SECRET}`)
                .send(omit(newUser, ['name']));
            statusCode.should.be.eql(400);
        });

        it('responds 401 when no Auth token specified', async() => {
            const {statusCode} = await request(app)
                .post('/api/users')
                .send(newUser);
            statusCode.should.be.eql(401);
        });
    });

});
