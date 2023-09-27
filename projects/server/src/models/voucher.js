const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Voucher extends Model {
    static associate(models) {
      Voucher.hasMany(models.User_Voucher, { foreignKey: "id_voucher" });
      Voucher.belongsTo(models.Category, { foreignKey: "id_category" });
    }
  }

  Voucher.init(
    {
      name: DataTypes.STRING,
      details: DataTypes.STRING,
      discountPercent: DataTypes.INTEGER,
      discountPrice: DataTypes.INTEGER,
      timeValid: DataTypes.INTEGER,
      minTotPrice: DataTypes.INTEGER,
      maxDiscPrice: DataTypes.INTEGER,
      codeVoucher: DataTypes.STRING,
      limit: DataTypes.INTEGER,
      id_category: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Voucher",
      createdAt: "createdAt",
      updatedAt: "updatedAt",
      timestamps: true,
    }
  );

  return Voucher;
};
