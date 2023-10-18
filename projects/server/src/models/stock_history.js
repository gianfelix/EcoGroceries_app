'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Stock_History extends Model {
    static associate(models) {
      // Define associations here
      Stock_History.belongsTo(models.Stock, { foreignKey: 'id_stock' });
      
    }
  }

  Stock_History.init(
    {
      id_stock: DataTypes.INTEGER,
      changeQty: DataTypes.INTEGER,
      totalQty: DataTypes.INTEGER,
      changedBy: DataTypes.STRING,
      id_change: DataTypes.INTEGER,
      actor: DataTypes.STRING,
      createdAt: {
        type: DataTypes.DATE,
      },
      updatedAt: {
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: 'Stock_History',
      tableName: 'Stock_History',
    }
  );

  return Stock_History;
};
