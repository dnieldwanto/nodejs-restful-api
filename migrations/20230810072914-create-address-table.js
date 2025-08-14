'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable({
      tableName: 'address',
      schema: "nodejs-restful"
    }, 
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
          schema: "nodejs-restful",
          key: "id"
        }
      }
    });
    
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable({
      tableName: 'address',
      schema: "nodejs-restful"
    });
  }
};
