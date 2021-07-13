const {Reservation,User,Train} = require('../models');
const {randomNumber} = require('../middlewares/math.middleware');

const create = async (req,res,next) => {
    
    
    let data = {
        reservationId: randomNumber(),
        userId: req.query.userId,
        trainId: req.query.trainId,
        seatNo: req.body.seatNo,
        paymentCode: randomNumber(),
        paidReservation: false,
        expire: false

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
    const result = await Reservation.findAll({where: {userId : req.query.userId, expire: false}});

    result.length == 0 
        ? res.json({'msg':'no reservation yet'})
        : res.json(result);
}


const findOneAdmin = async (req,res,next) => {
    const result = await Reservation.findOne({
        where: {
            reservationId: req.query.reserveId
            // id: req.query.userId,
            },
            attributes: ['reservationId','seatNo','paidReservation','paymentCode'],

            include: [{
                model: User
            },{model: Train}]  
        });

    result.length == 0 
        ? res.json({'msg':'no reservation yet'})
        : res.json(result);
}

const findOneUser = async (req,res,next) => {
    const result = await Reservation.findOne({
            where: {
                reservationId: req.query.reserveId,
                expire: false
                },
            attributes: ['seatNo','paidReservation'],
            include: [{
                model: User
            },{model: Train}]   
        });

    result.length == 0 
        ? res.json({'msg':'no reservation yet'})
        : res.json(result);
}

const confirmPayment = async (req,res,next) => {
    const result = await Reservation.findOne({
        where:{reservationId: req.query.reserveId, expire: false}
    });

    result.length == 0 
        ? res.json({'msg':'no reservation yet'})
        : req.body.paymentCode == result.paymentCode
            ? await Reservation.update({paidReservation: true},{where: {reservationId: req.query.reserveId,expire: false}})
                ? res.json({'msg': 'you have paid for reservation'})
                : ''
            : ''
}



const update = async (req,res,next) => {
    let data = {
        trainId: req.query.trainId,
        seatNo: req.body.seatNo
    };
    const result = await Reservation.update(data, {where: {reservationId: req.query.reserveId}});
    console.log(result)
    result.length == 1 
        ? res.json({'msg':'you have updated your reservation successfully'}) 
        : res.json({'msg':'fail to update reservation'});
}

const remove = async (req,res,next) => {
    const result = await Reservation.destroy({where:{reservationId: req.query.reserveId}});
    result 
        ? res.json({'msg':'Train delete'}) 
        : res.json({'msg':'fail to delete Train'});  
}

module.exports = {
    findAll,
    create,
    update,
    remove,
    findOneAdmin,
    findOneUser,
    findAllSingleUser,
    confirmPayment
}