const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
      Product.belongsTo(models.Category, {foreignKey: 'id_category' });
      // Product.hasMany(models.User_Voucher, { foreignKey: 'id_product' });
      Product.hasMany(models.Stock, { foreignKey: 'id_product' });
    }
  }

  Product.init(
    {
      name: DataTypes.STRING,
      price: DataTypes.INTEGER,
      productImg: DataTypes.STRING,
      description: DataTypes.STRING,
      weight: DataTypes.INTEGER,
      isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      id_category: DataTypes.INTEGER,
      createdAt: {
        type: DataTypes.DATE,
      },
      updatedAt: {
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: 'Product',
    }
  );

  return Product;
};
