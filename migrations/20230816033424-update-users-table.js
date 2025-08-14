'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn({
      tableName: 'users',
      schema: "nodejs-restful"
    }, "roleId", 
    {
      type: Sequelize.INTEGER,
      allowNull: false,
      references : {
        model: {
          tableName: "user-roles",
          schema: "nodejs-restful"
        },
        key: "id"
      }
    });

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.addColumn({
      tableName: 'users',
      schema: "nodejs-restful"
    }, "roleId");
  }
};
