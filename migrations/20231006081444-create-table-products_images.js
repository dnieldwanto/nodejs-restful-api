'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable({
      tableName: 'products-image',
      schema: "nodejs-restful"
    }, { 
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
      },
      product_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true,
        references: {
          model: {
            tableName: "products",
            schema: "nodejs-restful"
          },
          key: "id"
        }
      },
      original_filename: {
        type: Sequelize.STRING,
        allowNull: false
      },
      physical_filename: {
        type: Sequelize.STRING,
        allowNull: false
      },
      extension_filename: {
        type: Sequelize.STRING,
        allowNull: false
      },
      created_at: {
        type: Sequelize.DATE
      },
      updated_at: {
        type: Sequelize.DATE
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable({
      tableName: 'products-image',
      schema: "nodejs-restful"
    });
  }
};
