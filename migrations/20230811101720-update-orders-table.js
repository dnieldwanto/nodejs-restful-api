'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn("orders", "statusOrder", 
    { 
      type: Sequelize.STRING
    });

    await queryInterface.addColumn("orders", "isActive", 
    { 
      type: Sequelize.INTEGER,
      defaultValue: 1
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("orders", "statusOrder")
    await queryInterface.removeColumn("orders", "isActive")
  }
};
