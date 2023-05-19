"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Products",
      [
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
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Products", null, {});
  },
};
