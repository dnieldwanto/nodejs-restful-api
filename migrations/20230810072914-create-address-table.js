'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('address', 
    { 
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
      },
      street: {
        type: Sequelize.STRING,
      },
      city: {
        type: Sequelize.STRING
      },
      province: {
        type: Sequelize.STRING
      },
      country: {
        type: Sequelize.STRING,
        allowNull: false
      },
      postalCode: {
        type: Sequelize.STRING,
        allowNull: false
      },
      contactId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "contacts",
          key: "id"
        }
      }
    });
    
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('address');
  }
};
