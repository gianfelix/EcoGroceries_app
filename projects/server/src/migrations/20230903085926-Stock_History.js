'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Stock_History', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
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
      change_qty: {
        type: Sequelize.INTEGER,
      },
      total_qty: {
        type: Sequelize.INTEGER,
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
      details: {
        type: Sequelize.STRING(45),
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Stock_History');
  },
};
