'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('User_Address', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      user_address: {
        type: Sequelize.STRING(45),
      },
      longitude: {
        type: Sequelize.STRING(45),
      },
      latitude: {
        type: Sequelize.STRING(45),
      },
      user_iduser: {
        type: Sequelize.INTEGER,
        references: {
          model: 'User', 
          key: 'id', 
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      isMain: {
        type: Sequelize.BOOLEAN
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('User_Address');
  },
};
