'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [
      {
        name: 'John Doe',
        email: 'johndoe@example.com',
        gender: true,
        avatar: 'avatar_url',
        referral: 'referral_code',
        password: 'hashed_password',
        birthday: new Date('1990-01-01'),
        referred_by: '0',
        isVerified: true,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Add more User records as needed
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  },
};
