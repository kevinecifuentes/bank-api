const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const catchAsync = require('../utils/catchAsync');
const User = require('../models/users.model');
const AppError = require('../utils/app.Error');

exports.protect = catchAsync(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  //valiar si el toen existe
  if (!token) {
    return next(
      new AppError('You are not looged in!, please log in to get access', 401)
    );
  }

  // decodificar el token
  const decode = await promisify(jwt.verify)(
    token,
    process.env.SECRET_JWT_SEED
  );
  //buscar e usuario y validar si existe
  const user = await User.findOne({
    where: {
      id: decode.id,
      status: 'active',
    },
  });

  //si no ediste el usuario
  if (!user) {
    return next(
      new AppError('The owner of this token is not longer available', 401)
    );
  }

  req.sessionUser = user;
  next();
});

exports.protectAccountOwner = catchAsync(async (req, res, next) => {
  const { user, sessionUser } = req;

  if (user.id !== sessionUser.id) {
    return next(new AppError('You do not own this account.', 401));
  }

  next();
});
