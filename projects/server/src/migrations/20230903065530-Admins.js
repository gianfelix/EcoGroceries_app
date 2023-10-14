'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Admins', {
      idadmin: {
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
      password: {
        type: Sequelize.STRING(45),
      },
      adminSuper: {
        type: Sequelize.BOOLEAN,
      },
      isActive: {
        type: Sequelize.BOOLEAN,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Admins');
  },
};
