'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Product_Categories', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      category_name: {
        type: Sequelize.STRING(45),
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Product_Categories');
  },
};
