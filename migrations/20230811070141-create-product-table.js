'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('products', 
    { 
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      productName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      price: {
        type: Sequelize.BIGINT,
        defaultValue: 0
      },
      stock: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      categoryId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: {
            tableName: "categories"
          },
          key: "id"
        }
      },
      supplierId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: {
            tableName: "suppliers"
          },
          key: "id"
        }
      },
      orderId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: {
            tableName: "orders"
          },
          key: "id"
        }
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('products');
  }
};
