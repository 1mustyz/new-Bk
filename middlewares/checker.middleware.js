// const { Profile, User, Logout, Forget } = require('../models');
const {User} = require('../models');

// const userChecker = async (req,res,next) => {
//     const result = await Profile.findOne({where:{email:req.query.email}});
//     result
//         ? removeUser(req,res,next)
//         : next();
// }

// const removeUser = async (req,res,next) => {
//     await User.destroy({where:{id:req.params.userId}});
//     res.json({"msg": "the user with the email already exit"});
// }

const comparePassword = (req,res,next) => {
    const confirmPassword = req.body.confirmPassword;
    const password = req.body.password;

    confirmPassword === password
        ? next()
        : res.json({"msg": "your password and confirm password does not match"})
} 

// const compareRandomDigit = async (req,res,next) =>{

//     const result = await Forget.findOne({
//         where : {email:req.user.email},
//         attribute : ['digit']
//     });

//     result ? 
//         result.length == 0 ?
//             res.json({'msg':'invalid starting endpoint'})
//             :result.digit == req.body.digit ?
//                 next()
//                 :res.json({'msg':'incorrect digits'})

//         :res.json({'msg':'invalid starting endpoint'})

// }


const emailChecker = async (req,res,next) => {
    const result = await User.findOne({where:{email:req.body.email}});
    result
        ? res.json({"msg": "this email is in use by another user"})
        : next();
}

// const confirmEmail = async (req,res,next) => {
//     const result = await Profile.findOne({where:{email:req.body.email}});
//     result
//         ? next()
//         : res.json({"msg": "this email is not registered"});
// }

// const checkLogout = async (req,res, next)=>{
//     const result = await Logout.findOne({where:{userId:req.user.id}});
//     result ? res.json('Unauthorized') : next()
// }

// const clearLogout = async (req,res,next)=>{
//     const data = req.body;
//     const result = await Logout.findOne({where:{email: data.email}});
//     if(!result) return next();
//     Logout.destroy({where:{email: data.email}});
//     return next();
// }

module.exports = {
    comparePassword,
    // userChecker,
    emailChecker,
    // checkLogout,
    // clearLogout,
    // confirmEmail,
    // compareRandomDigit
}