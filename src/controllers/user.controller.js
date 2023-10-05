const User = require('../models/users.model');
const AppError = require('../utils/app.Error');
const catchAsync = require('../utils/catchAsync');
const bcrypt = require('bcryptjs');
const jsonwebtoken = require('../utils/jsonwebtoken');
const generateJWT = require('../utils/jsonwebtoken');
const Transfers = require('../models/transfers.model');

//crear una cuenta de usuario
exports.accountUserCreate = catchAsync(async (req, res, next) => {
  const { name, password } = req.body;

  const salt = await bcrypt.genSalt(12);
  const encryptedPassword = await bcrypt.hash(password, salt);

  const accountNumber = Math.floor(Math.random() * 900000 + 100000);

  const userAmonut = 1000;

  const user = await User.create({
    name: name.toLowerCase().trim(),
    password: encryptedPassword,
    accountNumber: accountNumber,
    amount: userAmonut,
  });

  const token = await generateJWT(user.id);

  return res.status(201).json({
    status: 'success',
    message: 'user account create successfully!',
    token,
    user: {
      id: user.id,
      name: user.name,
      accountNumber: user.accountNumber,
      amount: user.amount,
      createdAt: user.createdAt,
    },
  });
});

//ingreso de usuario con la cuenta ya existente
exports.accountLoginUser = catchAsync(async (req, res, next) => {
  const { accountNumber, password } = req.body;

  const user = await User.findOne({
    where: {
      accountNumber,
      status: 'active',
    },
  });

  if (!user) {
    return next(
      new AppError(`incorrect account number or incorrect password`, 404)
    );
  }

  if (!(await bcrypt.compare(password, user.password))) {
    return next(new AppError('incorrect accountNumber or Password', 401));
  }

  const token = await generateJWT(user.id);

  return res.status(200).json({
    status: 'success',
    message: `User Login Succesfully`,
    token,
    user: {
      id: user.id,
      name: user.name,
      accountNumber: user.accountNumber,
      amount: user.amount,
      createdAt: user.createdAt,
    },
  });
});

// obtener todas la transferencias
exports.trasnsferUserList = catchAsync(async (req, res, next) => {
  const { user } = req;

  return res.status(200).json({
    status: 'success',
    message: 'hello this is trasnsferUserLis',
    user,
  });
});

//refactorizar código: Ya lo refactorize Jesus Bernal
