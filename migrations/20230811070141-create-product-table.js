'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable({
      tableName: 'products',
      schema: "nodejs-restful"
    }, 
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
            tableName: "categories",
            schema: "nodejs-restful"
          },
          key: "id"
        }
      },
      supplierId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: {
            tableName: "suppliers",
            schema: "nodejs-restful"
          },
          key: "id"
        }
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable({
      tableName: 'products',
      schema: "nodejs-restful"
    });
  }
};
