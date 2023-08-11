'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('suppliers', 
    { 
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      supplierName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      supplierAddress: {
        type: Sequelize.STRING
      },
      supplierPhone: {
        type: Sequelize.STRING
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('suppliers');
  }
};
