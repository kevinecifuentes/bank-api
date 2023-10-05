const User = require('./users.model');
const Transfers = require('./transfers.model');

const initModels = () => {
  User.hasMany(Transfers, { foreignKey: 'userId' });
  Transfers.belongsTo(User, { foreignKey: 'userId' });
};

module.exports = initModels;
