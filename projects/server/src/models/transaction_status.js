'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transaction_Status extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Transaction_Status.hasMany(models.Transaction, { foreignKey: 'id_status' });
    }
  }
  Transaction_Status.init({
    status: DataTypes.STRING,
    createdAt: {
      type: DataTypes.DATE,
    },
    updatedAt: {
      type: DataTypes.DATE,
    },
  }, {
    sequelize,
    modelName: 'Transaction_Status',
  });
  return Transaction_Status;
};