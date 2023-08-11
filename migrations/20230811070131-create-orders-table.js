'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('orders', 
    { 
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      orderNumber: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      orderDate: {
        type: Sequelize.DATE,
        allowNull: false
      },
      quantity: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      total: {
        type: Sequelize.BIGINT,
        defaultValue: 0
      },
      username : {
        type: Sequelize.STRING,
        allowNull: false,
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
    await queryInterface.dropTable('orders');
  }
};
