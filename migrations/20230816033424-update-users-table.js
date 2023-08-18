'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('users', "isActive", 
    {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 1,
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
