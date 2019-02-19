const express = require('express');

const app = express();

require('dotenv').config({path: '.env.test'});

require('should');

const Config = require('../src/helpers/config');
const Router = require('../src/routes');

Config.configure(app);
Router.configure(app);

module.exports = app;
