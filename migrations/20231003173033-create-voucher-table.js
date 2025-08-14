'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable({
      tableName: 'vouchers',
      schema: "nodejs-restful"
    }, { 
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
      },
      voucherCode: {
        type: Sequelize.STRING,
        allowNull: false
      },
      discountVoucher: {
        type: Sequelize.DOUBLE,
        allowNull: false
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable({
      tableName: 'vouchers',
      schema: "nodejs-restful"
    });
  }
};
