'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // define association here
      User.hasMany(models.User_Address, { foreignKey: 'id_user' });
      User.hasMany(models.User_Voucher, { foreignKey: 'id_user' });
      User.hasMany(models.Transaction, { foreignKey: 'id_user' });
      User.hasOne(models.Cart, { foreignKey: 'id_user' });
    }
  };
  User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    gender: DataTypes.STRING,
    avatar: DataTypes.STRING,
    referral: DataTypes.STRING,
    password: DataTypes.STRING,
    birthday: DataTypes.DATE,
    referred_by: {
      type: DataTypes.STRING,
      defaultValue: '0', 
    },
    isVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false, 
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true, 
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
