'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Products', {
      idproduct: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: Sequelize.STRING(45),
      },
      price: {
        type: Sequelize.STRING(45),
      },
      product_img: {
        type: Sequelize.STRING(45),
      },
      description: {
        type: Sequelize.STRING(45),
      },
      id_category: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Product_Categories', 
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      isActive: {
        type: Sequelize.BOOLEAN
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Products');
  },
};
