'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Stock extends Model {
    static associate(models) {
      Stock.belongsTo(models.Product, { foreignKey: 'id_product' });
      Stock.belongsTo(models.Branch, { foreignKey: 'id_branch' });
      Stock.belongsTo(models.Stock_Promos, { foreignKey: 'id_stock_promo' });
      Stock.hasMany(models.Stock_History, { foreignKey: 'id_stock' });
      Stock.belongsToMany(models.Cart, { through: 'Cart_Stock', foreignKey: 'id_stock' });
      Stock.hasMany(models.Cart_Stock, { foreignKey: 'id_stock' });
    }
  }

  Stock.init(
    {
      id_product: DataTypes.INTEGER,
      id_branch: DataTypes.INTEGER,
      qty: DataTypes.INTEGER,
      discountPercent: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      id_stock_promo: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      createdAt: {
        type: DataTypes.DATE,
      },
      updatedAt: {
        type: DataTypes.DATE,
      },id_product: DataTypes.INTEGER,
      id_branch: DataTypes.INTEGER,
      qty: DataTypes.INTEGER,
      discountPercent: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      id_stock_promo: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      createdAt: {
        type: DataTypes.DATE,
      },
      updatedAt: {
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: 'Stock',
      tableName: 'Stock',
    }
  );

  return Stock;
};
