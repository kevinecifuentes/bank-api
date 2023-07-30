const Transfer = require('./../models/transfer.model');

exports.sendTransfer = async (req, res) => {
  try {
    const { senderUserId, receiverUserId, id, amount } = req.body;

    const tranfer = await Transfer.findOne({
      where: {
        id,
      },
    });

    if (!tranfer) {
      return res.status(404).json({
        status: 'error',
        message: 'transfer not found',
      });
    }

    const transferCreated = await Transfer.create({
      senderUserId,
      receiverUserId,
      amount,
    });

    return res.status(200).json({
      status: 'transfer send succesfully',
      transferCreated,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      status: 'fail',
      message: 'something went wrong',
    });
  }
};
