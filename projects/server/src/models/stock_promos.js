'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Stock_Promos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
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