'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Transaction', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      id_user: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users', 
          key: 'id', 
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      tot_price: {
        type: Sequelize.INTEGER,
      },
      tot_qty: {
        type: Sequelize.INTEGER,
      },
      status: {
        type: Sequelize.STRING(45),
      },
      shipping: {
        type: Sequelize.INTEGER,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Transaction');
  },
};
