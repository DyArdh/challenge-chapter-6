"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "ProductComponents",
      [
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
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("ProductComponents", null, {});
  },
};
