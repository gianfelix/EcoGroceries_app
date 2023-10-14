'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Transactions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_user: {
        type: Sequelize.INTEGER
      },
      id_user_address: {
        type: Sequelize.INTEGER
      },
      totPrice: {
        type: Sequelize.FLOAT
      },
      totQty: {
        type: Sequelize.INTEGER
      },
      totWeight: {
        type: Sequelize.FLOAT
      },
      id_status: {
        type: Sequelize.INTEGER
      },
      shipper: {
        type: Sequelize.STRING
      },
      shippingMethod: {
        type: Sequelize.STRING
      },
      shippingCost: {
        type: Sequelize.INTEGER
      },
      arrivalEstEarly: {
        type: Sequelize.DATE
      },
      arrivalEstLate: {
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Transactions');
  }
};