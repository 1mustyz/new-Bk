const {Train} = require('../models');

const create = async (req,res,next) => {
    
    let data = req.body;
    
    await Train.create(data);
    return res.json({'msg':'a new train has been added successfully'});    
}


const findAll = async (req,res,next) => {
    const result = await Train.findAll();

    result.length == 0 
        ? res.json({'msg':'no train added yet'})
        : res.json(result);
}

const findOne = async (req,res,next) => {
    const result = await Train.findOne({where: {id: req.query.id}});

    result.length == 0 
        ? res.json({'msg':'no train added yet'})
        : res.json(result);
}

const update = async (req,res,next) => {
    let data = {
        destination: req.body.destination,
        noOfSeat:  req.body.noOfSeat,
        dayOfTakeOff: req.body.dayOfTakeOff,
        timeOfTakeOff: req.body.timeOfTakeOff,
        price: req.body.price,
    };
    const result = await Train.update(data, {where: {id: req.query.id}});
    console.log(result)
    result.length == 1 
        ? res.json({'msg':'train update successfully'}) 
        : res.json({'msg':'fail to update'});
}

const remove = async (req,res,next) => {
    const result = await Train.destroy({where:{id: req.query.id}});
    result 
        ? res.json({'msg':'Train deleted successfully'}) 
        : res.json({'msg':'fail to delete Train'});  
}

module.exports = {
    findAll,
    create,
    update,
    remove,
    findOne
}