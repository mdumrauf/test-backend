
const env = process.env.NODE_ENV;

const bodyParser = require('body-parser');
const morgan = require('morgan');

class Config {
    static configure(app) {
        app.use(bodyParser.json());
        if (env !== 'test') {
            app.use(morgan(env && env === 'prod' && 'combined' || 'dev'));
        }
    }
}

module.exports = Config;
