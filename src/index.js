const express = require('express');

const app = express();

const Config = require(`./helpers/config`);

Config.configure(app);

module.exports = app;
