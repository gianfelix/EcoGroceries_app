const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Transaction_Stock_Details extends Model {
    static associate(models) {
    Transaction_Stock_Details.belongsTo(models.Transaction_Stock, {foreignKey: 'id_ts' });

    }
  }

  Transaction_Stock_Details.init(
    {
      name: DataTypes.STRING,
      price: DataTypes.STRING,
      Transaction_Stock_DetailsImg: DataTypes.STRING,
      description: DataTypes.STRING,
      weight: DataTypes.INTEGER,
      category: DataTypes.STRING,
      createdAt: {
        type: DataTypes.DATE,
      },
      updatedAt: {
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: 'Transaction_Stock_Details',
    }
  );

  return Transaction_Stock_Details;
};
