"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "ComponentSuppliers",
      [
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
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("ComponentSuppliers", null, {});
  },
};
