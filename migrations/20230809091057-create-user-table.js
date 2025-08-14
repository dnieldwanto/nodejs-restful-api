'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports =  {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable({
      tableName: 'users',
      schema: "nodejs-restful"
    }, { 
      username: {
        type: Sequelize.STRING,
        primaryKey: true,
        unique: true,
        allowNull: false
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false
      },
      token: {
        type: Sequelize.STRING
      },
      createdAt: {
        type: Sequelize.DATE
      },
      updatedAt: {
        type: Sequelize.DATE
      },
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable({
      tableName: 'users',
      schema: "nodejs-restful"
    });
  }
};
