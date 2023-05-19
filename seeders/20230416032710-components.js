"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Components",
      [
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
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Components", null, {});
  },
};
