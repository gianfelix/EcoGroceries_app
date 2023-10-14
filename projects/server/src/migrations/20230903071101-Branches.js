'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Branch', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: Sequelize.STRING(45),
      },
      longitude: {
        type: Sequelize.STRING(45),
      },
      latitude: {
        type: Sequelize.STRING(45),
      },
      address: {
        type: Sequelize.STRING(45),
      },
      id_admin: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Admins', 
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
    await queryInterface.dropTable('Branch');
  },
};
