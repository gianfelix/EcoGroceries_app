'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transaction_Voucher extends Model {
    static associate(models) {
      // Define associations here
      Transaction_Voucher.belongsTo(models.Transaction, { foreignKey: 'id_transaction' });
    }
  };
  Transaction_Voucher.init({
    id_user_voucher: {
      type: DataTypes.INTEGER,
    },
    id_transaction: {
      type: DataTypes.INTEGER,
    }
  }, {
    sequelize,
    modelName: 'Transaction_Voucher',
    tableName: 'Transaction_Vouchers',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
  });
  return Transaction_Voucher;
};
