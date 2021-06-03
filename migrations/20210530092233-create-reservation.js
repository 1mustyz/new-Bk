'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Reservations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      reservationId: {
        type: Sequelize.STRING
      },
      userId: {
        type: Sequelize.INTEGER,
        onDelete:'CASCADE',
        references:{
          model:'Users',
          key:'id',
          as:'userId'
        },
      },
      trainId: {
        type: Sequelize.INTEGER,
        onDelete:'CASCADE',
        references:{
          model:'Trains',
          key:'id',
          as:'trainId'
        },
      },
      seatNo: {
        type: Sequelize.STRING
      },
      paymentCode: {
        type: Sequelize.STRING
      },
      paidReservation: {
        type: Sequelize.BOOLEAN
      },
      expire: {
        type: Sequelize.BOOLEAN
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
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Reservations');
  }
};