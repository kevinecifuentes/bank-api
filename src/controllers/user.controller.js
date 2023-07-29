const User = require('./../models/user.model');
const randomNumber = require('./../utils/getRandomNumber');

exports.createUser = async (req, res) => {
  try {
    const { name, password } = req.body;

    const user = await User.create({
      name,
      password,
      accountNumber: randomNumber(),
    });

    return res.status(200).json({
      status: 'succes',
      message: 'user has been created',
      user,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      status: 'fail',
      message: 'something went wrong!',
      error,
    });
  }
};
