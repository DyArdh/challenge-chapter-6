const {
  Components,
  ComponentSuppliers,
  ProductComponents,
  Products,
  Suppliers,
} = require("../models");

module.exports = {
  components: async () => {
    await Components.bulkCreate([
      {
        name: "Gateron Oil King",
        description: "Linear",
      },
      {
        name: "Gateron Milky Yellow",
        description: "Linear",
      },
      {
        name: "JWICK Black",
        description: "Linear",
      },
      {
        name: "JWICK T1",
        description: "Tactile",
      },
      {
        name: "Aflion Shadow",
        description: "Tactile",
      },
    ]);
  },

  products: async () => {
    await Products.bulkCreate([
      {
        name: "Akukin Mark II",
        quantity: 10,
      },
      {
        name: "Akukin Mark II Bluetooth",
        quantity: 15,
      },
      {
        name: "Suico V60",
        quantity: 16,
      },
      {
        name: "Suico V65",
        quantity: 15,
      },
      {
        name: "Akukin Pro TKL",
        quantity: 20,
      },
    ]);
  },

  productComponents: async () => {
    await ProductComponents.bulkCreate([
      {
        product_id: 1,
        component_id: 2,
      },
      {
        product_id: 2,
        component_id: 3,
      },
      {
        product_id: 3,
        component_id: 4,
      },
      {
        product_id: 4,
        component_id: 1,
      },
      {
        product_id: 5,
        component_id: 1,
      },
    ]);
  },
  suppliers: async () => {
    await Suppliers.bulkCreate([
      {
        name: "Gateron",
        address: "Hongkong",
      },
      {
        name: "JWICK",
        address: "China",
      },
      {
        name: "Aflion",
        address: "China",
      },
      {
        name: "Akko",
        address: "China",
      },
      {
        name: "Outemu",
        address: "China",
      },
    ]);
  },
  componentSuppliers: async () => {
    await ComponentSuppliers.bulkCreate([
      {
        component_id: 1,
        supplier_id: 1,
      },
      {
        component_id: 2,
        supplier_id: 2,
      },
      {
        component_id: 3,
        supplier_id: 3,
      },
    ]);
  },
};
