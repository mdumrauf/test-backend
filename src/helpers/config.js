
const env = process.env.NODE_ENV;

class Config {
    static configure(app) {
        app.use(require('body-parser').json());
        app.use(require('morgan')(env && env === 'prod' && 'combined' || 'dev'));

        require('./mongoose').configure();
    }
}

module.exports = Config;
