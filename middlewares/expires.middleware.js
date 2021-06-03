const {Train,Reservation} = require('../models');

const dayOfTheWeek = {
    monday: 1,
    tuesday: 2,
    wednesday: 3,
    thursday: 4,
    friday: 5,
    saturday: 6,
    sunday: 7
}

let dayOfTakeOffNo, currentDayNo;


const reservationExpires = async (req,res,next) => {
    const result = await Reservation.findOne({
        where: {reservationId: req.query.reserveId},
        attributes: ['trainId']
    });

    if(result.length == 0) return '';
    else{
        const resultTrain = await Train.findOne({where: {id: result.trainId}})
        const { timeOfTakeOff, dayOfTakeOff } = resultTrain;
        const currentDay = req.query.currentDay;


        for (const day in dayOfTheWeek) {
            
            if(day == dayOfTakeOff) dayOfTakeOffNo = dayOfTheWeek[day];
            if(day == currentDay) currentDayNo = dayOfTheWeek[day];

          }

          if(currentDayNo > dayOfTakeOffNo){
              await Reservation.update({expire: true},{where: {reservationId: req.query.reserveId}});
              return res.json({'msg': 'your reservation has expired'});
          }
          else next();
    }
}

module.exports = {
    reservationExpires
}