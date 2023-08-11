'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn("orders", "productId", 
    { 
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: {
          tableName: "products"
        },
        key: "id"
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("orders", "productId")
  }
};
