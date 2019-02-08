const express = require('express');

const app = express();

const Config = require(`./helpers/config`);
const Router = require('./routes');

Config.configure(app);
Router.configure(app);

module.exports = app;
