const User = require('../models/users.model');
const AppError = require('../utils/app.Error');
const catchAsync = require('../utils/catchAsync');
const Transfers = require('../models/transfers.model');

exports.userValid = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findOne({
    where: {
      id,
      status: 'active',
    },
    attributes: {
      exclude: ['password'],
    },
    include: [
      {
        model: Transfers,
        attributes: {
          exclude: ['userId'],
        },
      },
    ],
  });

  if (!user) {
    return next(new AppError(`User with id ${id} not found`));
  }

  req.user = user;
  next();
});
