"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ProductComponents extends Model {
    static associate(models) {
      // define association here
    }
  }
  ProductComponents.init(
    {
      product_id: DataTypes.INTEGER,
      component_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "ProductComponents",
    }
  );
  return ProductComponents;
};
