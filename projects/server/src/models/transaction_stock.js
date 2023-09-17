'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Transaction_Stock extends Model {
    static associate(models) {
      // Define associations here
      // Transaction_Stock.belongsTo(models.Transaction, { foreignKey: 'id_transaction' });
      // Transaction_Stock.belongsTo(models.Stock, { foreignKey: 'id_stock' });
    }
  }

  Transaction_Stock.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      id_transaction: DataTypes.INTEGER,
      id_stock: DataTypes.INTEGER,
      price: DataTypes.INTEGER,
      qty: DataTypes.INTEGER,
      weight: DataTypes.INTEGER,
      createdAt: {
        type: DataTypes.DATE,
      },
      updatedAt: {
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: 'Transaction_Stock',
      tableName: 'Transaction_Stock',
    }
  );

  return Transaction_Stock;
};
