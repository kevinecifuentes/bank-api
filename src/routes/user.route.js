const express = require('express');

//controllers
const userControllers = require('./../controllers/user.controller');

const router = express.Router();

router.post('/signup').post('/login').get('/:id/history');

router.route('/').post(userControllers.createUser);
// .get(userControllers.findAllUsers);

module.exports = router;
