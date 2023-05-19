"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Components extends Model {
    static associate(models) {
      Components.belongsToMany(models.Products, {
        through: "ProductComponents",
        foreignKey: "component_id",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });

      Components.belongsToMany(models.Suppliers, {
        through: "ComponentSuppliers",
        foreignKey: "component_id",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
    }
  }
  Components.init(
    {
      name: DataTypes.STRING,
      description: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "Components",
    }
  );
  return Components;
};
