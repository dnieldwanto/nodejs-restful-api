'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable({
      tableName: 'contacts',
      schema: "nodejs-restful"
    }, 
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
            tableName: "users",
            schema: "nodejs-restful"
          },
          key: "username"
        }
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable({
      tableName: 'contacts',
      schema: "nodejs-restful"
    });
    
  }
};