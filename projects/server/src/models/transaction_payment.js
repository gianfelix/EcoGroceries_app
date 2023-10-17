'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transaction_Payment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Transaction_Payment.belongsTo(models.Transaction, { foreignKey: 'id_transaction' });
    }
  }
  Transaction_Payment.init({
    id_transaction: DataTypes.INTEGER,
    paymentProof: DataTypes.STRING,
    createdAt: {
      type: DataTypes.DATE,
    },
    updatedAt: {
      type: DataTypes.DATE,
    },
  }, {
    sequelize,
    modelName: 'Transaction_Payment',
  });
  return Transaction_Payment;
};