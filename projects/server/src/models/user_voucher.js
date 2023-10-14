'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User_Voucher extends Model {
    static associate(models) {
      // Define associations here if needed
      User_Voucher.belongsTo(models.Voucher, { foreignKey: 'id_voucher' });
      User_Voucher.belongsTo(models.User, { foreignKey: 'id_user' });
      User_Voucher.belongsTo(models.Product, { foreignKey: 'id_product' });
    }
  }

  User_Voucher.init(
    {
      id_voucher: DataTypes.INTEGER,
      id_user: DataTypes.INTEGER,
      isUsed: DataTypes.BOOLEAN,
      id_product: DataTypes.INTEGER,
      validUntil: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: 'User_Voucher',
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
      timestamps: true,
      // Other model options go here
    }
  );

  return User_Voucher;
};
