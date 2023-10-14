'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    static associate(models) {
      // define association here
      Category.hasMany(models.Product, { foreignKey: 'id_category' });
      Category.hasMany(models.Voucher, { foreignKey: 'id_category' })
    }
  };
  Category.init({

    category: DataTypes.STRING,
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true, 
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Category',
  });
  return Category;
};
