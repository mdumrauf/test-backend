const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const mongoose = require('./helpers/mongoose');
const logger = require('./helpers/logger');

const Router = require('./routes');
const packageJson = require('../package.json');

const {
    BODY_LIMIT,
    NODE_ENV,
    PORT
} = process.env;

class App {
    constructor() {
        /**
         * @var {express} app
         */
        this.app = express();
    }

    _onListening() {
        logger.info(`Started ${packageJson.name} at port ${PORT} in ${NODE_ENV} environment`);
    }

    _onError(err) {
        logger.error(`App Crashed ${err.errorMessage}`);
        process.exit;
    }

    init() {
        this._configure();
        this.app.listen(PORT, this._onListening);
        this.app.on('error', this._onError);
    }

    _configure() {
        mongoose.configure();
        this._middleWares();
        this._routes();
    }

    _middleWares() {
        require('node-friendly-response');
        this.app.use(bodyParser.json({limit: BODY_LIMIT}));
        this.app.use(bodyParser.urlencoded({extended: true}));
        this.app.use(cookieParser());
        if (NODE_ENV === 'development') {
            this.app.use(morgan('dev'));
            this.app.use(cors({
                credentials: true,
                origin: /^http:\/\/localhost/
            }));
        } else {
            this.app.use(morgan('combined'));
            this.app.use(cors());
        }
    }

    _routes() {
        Router.configure(this.app);
    }
}

module.exports = App;
