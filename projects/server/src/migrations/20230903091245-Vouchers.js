'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('User_Vouchers', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      id_voucher: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Vouchers', 
          key: 'id', 
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
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
      id_product: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Products',
          key: 'id', 
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      isUsed: {
        type: Sequelize.BOOLEAN,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('User_Vouchers');
  },
};
