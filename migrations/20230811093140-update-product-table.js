'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.removeColumn("products", "orderId")
  },
  async down(queryInterface, Sequelize) {
  }
};
