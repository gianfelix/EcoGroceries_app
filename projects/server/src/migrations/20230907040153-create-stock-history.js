'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Stock_Histories', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      changedBy: {
        type: Sequelize.STRING
      },
      id_change: {
        type: Sequelize.INTEGER
      },
      id_stock: {
        type: Sequelize.INTEGER
      },
      changeQty: {
        type: Sequelize.INTEGER
      },
      totalQty: {
        type: Sequelize.INTEGER
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
    await queryInterface.dropTable('Stock_Histories');
  }
};