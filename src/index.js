const express = require('express');

const app = express();

const Config = require(`./helpers/config`);
const Mongoose = require('./helpers/mongoose');
const Router = require('./routes');

Config.configure(app);
Mongoose.configure()
Router.configure(app);

module.exports = app;
