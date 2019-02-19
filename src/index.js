const express = require('express');

const Config = require('./helpers/config');
const Mongoose = require('./helpers/mongoose');
const Router = require('./routes');

module.exports = async() => {
    const app = express();

    Config.configure(app);
    await Mongoose.configure();
    Router.configure(app);

    return app;
};
