const Transfers = require('../models/transfers.model');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/app.Error');
const User = require('../models/users.model');

exports.BankTransfers = catchAsync(async (req, res, next) => {
  const { amount, reciverUserId, senderUserId } = req.body;
  const { id: userId } = req.sessionUser;

  const destUserAccount = await User.findOne({
    where: {
      accountNumber: reciverUserId,
    },
  });

  const remUserAccount = await User.findOne({
    where: {
      accountNumber: senderUserId,
    },
  });

  if (userId !== remUserAccount.id) {
    return next(new AppError('error no es tu cuanta para enviar'), 400);
  }

  if (!destUserAccount) {
    return next(new AppError('transfer not found', 404));
  }

  if (destUserAccount.accountNumber === remUserAccount.accountNumber) {
    return next(new AppError('error no se peude auntomandar dinelo'), 400);
  }

  if (remUserAccount.amount < amount) {
    return next(
      new AppError('you do not have enough money in your account', 403)
    );
  }

  const TranfersCreate = await Transfers.create({
    amount,
    senderUserId,
    reciverUserId,
    userId,
  });

  let newAmountUserTransfer = remUserAccount.amount - amount;
  await remUserAccount.update({ amount: newAmountUserTransfer });

  let newAmountUserReceiver = destUserAccount.amount + amount;
  await destUserAccount.update({ amount: newAmountUserReceiver });

  return res.status(200).json({
    status: 'success',
    message: 'transferecia completada',
    TranfersCreate,
  });
});
