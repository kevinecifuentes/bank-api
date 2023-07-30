const express = require('express');

//controllers
const userControllers = require('./../controllers/user.controller');

const router = express.Router();

router
  .post('/signup', userControllers.createUser)
  .post('/login', userControllers.loginUser)
  .get('/:id/history');

module.exports = router;
