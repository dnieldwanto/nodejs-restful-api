'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('carts', { 
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      productId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references : {
          model: {
            tableName: "products"
          },
          key: "id"
        }
      },
      username: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: {
            tableName: "users"
          },
          key: "username"
        }
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      totalPayment: {
        type: Sequelize.BIGINT,
        allowNull: false
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('carts');
  }
};
