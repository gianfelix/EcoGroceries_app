'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Transaction_Stock', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      id_transaction: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Transaction', 
          key: 'id', 
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      id_stock: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Stocks', 
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      price: {
        type: Sequelize.INTEGER,
      },
      qty: {
        type: Sequelize.INTEGER,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Transaction_Stock');
  },
};
