'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Carts', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      id_user: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
          model: 'Users', // Referencing the 'Users' model
          key: 'iduser', // Referencing the 'iduser' column in 'Users' model
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      total_price: {
        type: Sequelize.INTEGER,
      },
      total_qty: {
        type: Sequelize.INTEGER,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Carts');
  },
};
