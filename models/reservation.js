'use strict';
const {
  Model
} = require('sequelize');
const train = require('./train');
module.exports = (sequelize, DataTypes) => {
  class Reservation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };

  Reservation.associate = models => {
    Reservation.belongsTo(models.User, {
      foreignKey: "userId"
    });
    Reservation.belongsTo(models.Train,{
      foreignKey: "trainId"
    });
  
    }

  Reservation.init({
    reservationId: DataTypes.STRING,
    userId: DataTypes.STRING,
    trainId: DataTypes.STRING,
    seatNo: DataTypes.STRING,
    paymentCode: DataTypes.STRING,
    paidReservation: DataTypes.BOOLEAN,
    expire: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Reservation',
  });
  return Reservation;
};