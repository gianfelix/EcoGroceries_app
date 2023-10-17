'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    static associate(models) {
      Transaction.belongsTo(models.User, { foreignKey: 'id_user' });
      Transaction.belongsTo(models.Branch, { foreignKey: 'id_branch' });
      Transaction.belongsTo(models.Transaction_Status, { foreignKey: 'id_status' });
      Transaction.belongsToMany(models.Stock, { through: 'Transaction_Stock', foreignKey: 'id_transaction' });
      Transaction.hasMany(models.Transaction_Voucher, { foreignKey: 'id_transaction' });
      Transaction.hasMany(models.Transaction_Stock, { foreignKey: 'id_transaction' });
      Transaction.hasOne(models.Transaction_Payment, {foreignKey: 'id_transaction'});
    }
  }

  Transaction.init(
    {
      id_user: DataTypes.INTEGER,
      userAddress: DataTypes.STRING,
      id_branch: DataTypes.INTEGER,
      totPrice: DataTypes.INTEGER, // probs shouldn't be the discounted price
      totPriceDiscount: DataTypes.INTEGER, 
      totQty: DataTypes.INTEGER,
      totWeight: DataTypes.INTEGER,
      id_status: {
        type: DataTypes.INTEGER,
        defaultValue: 1, 
      },
      shipper: DataTypes.STRING,
      shippingMethod: DataTypes.STRING,
      shippingCost: DataTypes.INTEGER,
      shippingCostDiscount: DataTypes.INTEGER,
      createdAt: {
        type: DataTypes.DATE,
      },
      updatedAt: {
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: 'Transaction',
      tableName: 'Transaction',
    }
  );

  return Transaction;
};