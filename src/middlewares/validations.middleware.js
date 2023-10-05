const { body, validationResult } = require('express-validator');

const validFields = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: 'error',
      errors: errors.mapped(),
    });
  }

  next();
};

// validaciones de usuario
exports.createAccountUser = [
  body('name').notEmpty().withMessage('Name is required'),
  body('password')
    .notEmpty()
    .withMessage('password is required')
    .isLength({ min: 8 })
    .withMessage('Password must have a least 8 characteres')
    .matches(/[a-zA-Z]/)
    .withMessage('Password must have cotain a least one leater'),
  validFields,
];

exports.loginAcountUser = [
  body('accountNumber').notEmpty().withMessage('accountNumber is required'),
  body('password').notEmpty().withMessage('password is required'),
  validFields,
];

//validacion para crear una transferencia

exports.transfersValidation = [
  body('amount').notEmpty().withMessage('amount is required'),
  body('reciverUserId').notEmpty().withMessage('reciverUserId is required'),
  body('senderUserId').notEmpty().withMessage('senderUserId is required'),
  validFields,
];
