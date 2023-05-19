"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ComponentSuppliers extends Model {
    static associate(models) {
      // define association here
    }
  }
  ComponentSuppliers.init(
    {
      component_id: DataTypes.INTEGER,
      supplier_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "ComponentSuppliers",
    }
  );
  return ComponentSuppliers;
};
