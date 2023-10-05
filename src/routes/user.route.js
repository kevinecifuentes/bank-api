const express = require('express');

//controlladores
const userController = require('./../controllers/user.controller');

//middlewares
const protectMiddlewares = require('./../middlewares/protect.middleware');
const userMiddleware = require('./../middlewares/user.middleware');
const validationsMiddlewares = require('./../middlewares/validations.middleware');

const router = express.Router();

router.post(
  '/signup',
  validationsMiddlewares.createAccountUser,
  userController.accountUserCreate
);

router.post(
  '/login',
  validationsMiddlewares.loginAcountUser,
  userController.accountLoginUser
);

router.use(protectMiddlewares.protect);

router.get(
  '/:id/history',
  userMiddleware.userValid,
  protectMiddlewares.protectAccountOwner,
  userController.trasnsferUserList
);

module.exports = router;

