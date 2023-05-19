const {
  Components,
  ComponentSuppliers,
  ProductComponents,
  Products,
  Suppliers,
} = require("../models");

module.exports = {
  components: async () => {
    await Components.destroy({
      truncate: true,
      cascade: true,
      restartIdentity: true,
    });
  },
  componentSupplier: async () => {
    await ComponentSuppliers.destroy({ truncate: true, restartIdentity: true });
  },
  productComponents: async () => {
    await ProductComponents.destroy({ truncate: true, restartIdentity: true });
  },
  products: async () => {
    await Products.destroy({
      truncate: true,
      cascade: true,
      restartIdentity: true,
    });
  },
  suppliers: async () => {
    await Suppliers.destroy({
      truncate: true,
      cascade: true,
      restartIdentity: true,
    });
  },
};
