'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Stock_Promos extends Model {
    static associate(models) {
      Stock_Promos.hasMany(models.Stock, { foreignKey: 'id_stock_promo' });
    }
  }
  Stock_Promos.init({
    promoName: DataTypes.STRING,
    promoDescription: DataTypes.STRING,
    buyQty: DataTypes.INTEGER,
    getQty: DataTypes.INTEGER,
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
  }, {
    sequelize,
    modelName: 'Stock_Promos',
  });
  return Stock_Promos;
};