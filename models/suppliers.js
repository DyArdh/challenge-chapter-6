"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Suppliers extends Model {
    static associate(models) {
      Suppliers.belongsToMany(models.Components, {
        through: "ComponentSuppliers",
        foreignKey: "supplier_id",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
    }
  }
  Suppliers.init(
    {
      name: DataTypes.STRING,
      address: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "Suppliers",
    }
  );
  return Suppliers;
};
