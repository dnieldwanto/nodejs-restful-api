'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('users', "roleId", 
    {
      type: Sequelize.INTEGER,
      allowNull: false,
      references : {
        model: {
          tableName: "user-roles"
        },
        key: "id"
      }
    });

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.addColumn('users', "roleId");
  }
};
