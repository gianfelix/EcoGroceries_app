'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('User', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: Sequelize.STRING(45),
      },
      email: {
        type: Sequelize.STRING(45),
      },
      gender: {
        type: Sequelize.BOOLEAN,
      },
      avatar: {
        type: Sequelize.STRING(45),
      },
      referral: {
        type: Sequelize.STRING(45),
      },
      password: {
        type: Sequelize.STRING(45),
      },
      birthday: {
        type: Sequelize.DATE,
      },
      referred_by: {
        type: Sequelize.STRING(45),
        defaultValue: '0', 
      },
      isActive: {
        type: Sequelize.BOOLEAN,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('User');
  },
};
