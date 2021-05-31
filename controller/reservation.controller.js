const {Reservation} = require('../models');
const {randomNumber} = require('../middlewares/math.middleware');

const create = async (req,res,next) => {
    
    
    let data = {
        reservationId: randomNumber(),
        userId: req.query.userId,
        trainId: req.query.trainId,
        seatNo: req.body.seatNo,
        paymentCode: randomNumber(),
        paidReservation: false

    }
    
    await Reservation.create(data);
    return res.json({'msg':'your reservation has been made successfully'});    
}


const findAll = async (req,res,next) => {
    const result = await Reservation.findAll();

    result.length == 0 
        ? res.json({'msg':'no reservation yet'})
        : res.json(result);
}

const findAllSingleUser = async (req,res,next) => {
    const result = await Reservation.findAll({where: {userId : req.query.userId}});

    result.length == 0 
        ? res.json({'msg':'no reservation yet'})
        : res.json(result);
}


const findOne = async (req,res,next) => {
    const result = await Reservation.findOne({where: {id: req.query.id}});

    result.length == 0 
        ? res.json({'msg':'no reservation yet'})
        : res.json(result);
}

const update = async (req,res,next) => {
    let data = {
        paidReservation: req.body.paidReservation
    };
    const result = await Reservation.update(data, {where: {id: req.query.id}});
    console.log(result)
    result.length == 1 
        ? res.json({'msg':'you have paid for your reservation successfully'}) 
        : res.json({'msg':'fail to accept payment'});
}

const remove = async (req,res,next) => {
    const result = await Reservation.destroy({where:{id: req.query.id}});
    result 
        ? res.json({'msg':'Train delete'}) 
        : res.json({'msg':'fail to delete Train'});  
}

module.exports = {
    findAll,
    create,
    update,
    remove,
    findOne,
    findAllSingleUser
}