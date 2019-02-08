
const express = require('express');
const router = express.Router();

const UserController = require('../../controllers/user');


router.post('/', UserController.create.bind(UserController));


module.exports = router;
