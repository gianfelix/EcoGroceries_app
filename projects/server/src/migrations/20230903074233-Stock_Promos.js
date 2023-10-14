'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Stock_Promos', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      promo_name: {
        type: Sequelize.STRING(45),
      },
      buy_qty: {
        type: Sequelize.INTEGER,
      },
      get_qty: {
        type: Sequelize.INTEGER,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Stock_Promos');
  },
};
