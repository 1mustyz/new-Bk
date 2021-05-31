'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Train extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };

  Train.associate = models => {
    
    Train.hasMany(models.Reservation);

  }


  Train.init({
    destination: DataTypes.STRING,
    noOfSeat: DataTypes.STRING,
    isActive: DataTypes.BOOLEAN,
    dayOfTakeOff: DataTypes.STRING,
    timeOfTakeOff: DataTypes.STRING,
    price: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Train',
  });
  return Train;
};