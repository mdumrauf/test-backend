
const mongoose = require('mongoose');
const {MongoMemoryServer} = require('mongodb-memory-server');
const logger = require('../../src/services/logger');

class Mongoose {
    static async configure() {
        const mongoServer = new MongoMemoryServer();

        const mongoDbUri = await mongoServer.getConnectionString();
        mongoose.Promise = Promise;
        mongoose.set('useCreateIndex', true);
        mongoose.connect(mongoDbUri, {useNewUrlParser: true});
        mongoose.connection.on('error', err => logger.error(`connection error ${err}`));

        return mongoose;
    }
}

module.exports = Mongoose;
