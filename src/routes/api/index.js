
const express = require('express');
const router = express.Router();

const usersRouter = require('./user');
const articlesRouter = require('./article');


router.use('/articles', articlesRouter);
router.use('/users', usersRouter);


module.exports = router;
