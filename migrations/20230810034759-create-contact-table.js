'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('contacts', 
    { 
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      firstName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      lastName: {
        type: Sequelize.STRING
      },
      email : {
        type: Sequelize.STRING
      },
      phone : {
        type: Sequelize.STRING
      },
      username : {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        references : {
          model: {
            tableName: "users"
          },
          key: "username"
        }
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('contacts');
    
  }
};