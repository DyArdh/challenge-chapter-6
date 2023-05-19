"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Products extends Model {
    static associate(models) {
      Products.belongsToMany(models.Components, {
        through: "ProductComponents",
        foreignKey: "product_id",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
    }
  }
  Products.init(
    {
      name: DataTypes.STRING,
      quantity: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Products",
    }
  );
  return Products;
};
