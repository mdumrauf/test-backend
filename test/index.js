const express = require('express');

const app = express();

const Config = require(`../src/helpers/config`);
const Router = require('../src/routes');

Config.configure(app);
Router.configure(app);

module.exports = app;
