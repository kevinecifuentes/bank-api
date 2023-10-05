const express = require('express');

//controlladores
const transfersControllers = require('./../controllers/transfers.controller');
const protectMiddlewares = require('./../middlewares/protect.middleware');

//middlewares
const validationsMiddlewares = require('./../middlewares/validations.middleware');

const router = express.Router();

router.use(protectMiddlewares.protect);
router.post(
  '/transfers',
  validationsMiddlewares.transfersValidation,
  transfersControllers.BankTransfers
);

module.exports = router;

