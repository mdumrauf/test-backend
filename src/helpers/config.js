
const env = process.env.NODE_ENV;

class Config {
    static configure(app) {
        app.use(require('body-parser').json());
        if (env !== 'test') {
            app.use(require('morgan')(env && env === 'prod' && 'combined' || 'dev'));
        }
    }
}

module.exports = Config;
