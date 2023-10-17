"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Branch extends Model {
    static associate(models) {
      // define association here
      // Branch.belongsTo(models.Admin, { foreignKey: 'id_admin' });
      Branch.hasMany(models.Admin, { foreignKey: "id_branch" });
      Branch.hasMany(models.Stock, { foreignKey: "id_branch" });
    }
  }
  Branch.init(
    {
      name: DataTypes.STRING,
      longitude: DataTypes.DOUBLE,
      latitude: DataTypes.DOUBLE,
      branchAddress: DataTypes.STRING,
      branchCity: DataTypes.STRING,
      branchProvince: DataTypes.STRING,
      id_city: DataTypes.INTEGER,
      id_province: DataTypes.INTEGER,
      isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Branch",
    }
  );
  return Branch;
};
