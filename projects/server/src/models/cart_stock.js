'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Cart_Stock extends Model {
    static associate(models) {
      Cart_Stock.belongsTo(models.Cart, { foreignKey: 'id_cart' }); 
      Cart_Stock.belongsTo(models.Stock, { foreignKey: 'id_stock' });
    }
  }
  Cart_Stock.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      id_cart: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      },
      id_stock: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      },
      price: {
        type: DataTypes.INTEGER
      },
      qty: {
        type: DataTypes.INTEGER
      },
      weight: {
        type: DataTypes.INTEGER
      },
      discount: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Cart_Stock',
      tableName: 'Cart_Stock',
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    }
  );

  return Cart_Stock;
};
