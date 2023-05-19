"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Suppliers",
      [
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
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Suppliers", null, {});
  },
};
