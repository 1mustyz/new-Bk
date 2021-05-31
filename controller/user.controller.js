const {User} = require('../models');


const create = async (req,res,next) => {

    // const saltRounds = 10;
    // const salt = bcrypt.genSaltSync(saltRounds);
    // const hash = bcrypt.hashSync(req.body.password, salt);

    let data = req.body;
    // data.password = hash;
    
    await User.create(data);
    return res.json({'msg':'account craeted successfully'});    
}


const findAll = async (req,res,next) => {
    const result = await User.findAll();

    result.length == 0 
        ? res.json({'msg':'no register user yet'})
        : res.json(result);
}

const update = async (req,res,next) => {
    let data = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        dob: req.body.dob,
        isAdmin: req.body.isAdmin
    };
    const result = await User.update(data, {where: {id: req.query.id}});
    console.log(result)
    result.length == 1 
        ? res.json({'msg':'update successfully'}) 
        : res.json({'msg':'fail to update'});
}

const remove = async (req,res,next) => {
    const result = await User.destroy({where:{id: req.query.id}});
    result 
        ? res.json({'msg':'account deleted successfully'}) 
        : res.json({'msg':'fail to delete account'});  
}

module.exports = {
    findAll,
    create,
    update,
    remove
}