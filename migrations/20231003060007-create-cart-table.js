'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable({
      tableName: 'carts',
      schema: "nodejs-restful"
    }, { 
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
            tableName: "products",
            schema: "nodejs-restful"
          },
          key: "id"
        }
      },
      username: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: {
            tableName: "users",
            schema: "nodejs-restful"
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
    await queryInterface.dropTable({
      tableName: 'cars',
      schema: "nodejs-restful"
    });
  }
};
