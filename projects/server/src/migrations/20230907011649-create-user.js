'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      gender: {
        type: Sequelize.BOOLEAN
      },
      avatar: {
        type: Sequelize.STRING
      },
      referral: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      birthday: {
        type: Sequelize.DATE
      },
      referred_by: {
        type: Sequelize.STRING
      },
      isVerified: {
        type: Sequelize.BOOLEAN
      },
      isActive: {
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        type: Sequelize.DATE
      },
      updatedAt: {
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};