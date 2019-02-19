
const mongoose = require('mongoose');
const logger = require('../services/logger');

class Mongoose {
    static async configure() {
        const {MONGODB_URI} = process.env;
        mongoose.Promise = Promise;
        mongoose.set('useCreateIndex', true);
        mongoose.connection.once('open',
            () => logger.info(
                `Mongoose connected to ${mongoose.connection.host}:${mongoose.connection.port}/${mongoose.connection.db.databaseName}`
            )
        );
        mongoose.connection.on('close', () => logger.info('connection closed'));
        mongoose.connection.on('error', err => logger.error(`connection error ${err}`));
        await mongoose.connect(MONGODB_URI, {useNewUrlParser: true});
    }
}

module.exports = Mongoose;
