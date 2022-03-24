'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      email: 'admin@gmail.com',
      password: 'Hoat2001',
      firstName: 'La',
      lastName: 'Hoat',
      address: 'Thach That - Ha Noi',
      gender: 1,
      roleId: 'R1',
      phoneNumber:  '0981668730',
      positionId: '',
      image: '',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
