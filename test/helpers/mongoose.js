
const mongoose = require('mongoose');
const {MongoMemoryServer} = require('mongodb-memory-server');
const logger = require('../../src/services/logger');

class Mongoose {
    static configure() {
        const mongoServer = new MongoMemoryServer();

        return mongoServer.getConnectionString().then(mongoDbUri => {
            mongoose.Promise = Promise;
            mongoose.set('useCreateIndex', true);
            mongoose.connect(mongoDbUri, {useNewUrlParser: true});
            mongoose.connection.on('error', err => logger.error(`connection error ${err}`));

            return mongoose;
        });
    }
}

module.exports = Mongoose;
