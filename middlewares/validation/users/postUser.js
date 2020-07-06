const _ = require("lodash")
const validator = require("validator")
const {User} = require("../../../models/User")

module.exports.validatePostUser = async (req,res,next) => {
    let errors = {};
    const email = _.get(req.body,"email","");
    const password = _.get(req.body,"password","");
    const password2 = _.get(req.body,"password2","");
    const fullname = _.get(req.body,"fullname","");
    const userType = _.get(req.body,"userType","client");

    //validate email
    //email empty?
    //email valid?
    //email exist?
    if(validator.isEmpty(email)) {
        errors.email = "Email is required"
    }else if(!validator.isEmail(email)){
        errors.email = "Email is invalid"       
    } else {
        const user = await User.findOne({email})
        if(user) errors.email = "Email exists"
    }
    

    //validate password
    if(validator.isEmpty(password)){
        errors.password = "Password is required"
    }else if(!validator.isLength(password,{min:6})){
        errors.password = "Password must have at least 6 character"
    }


    //validate password2
    if(validator.isEmpty(password2)){
        errors.password2 = "Password2 is required"
    }else if(!validator.equals(password,password2)){
        errors.password2 = "Confirm password must match"
    }

    //validate fullname
    if(validator.isEmpty(fullname)){
        errors.fullname = "fullname is required"
    }else if(!validator.isLength(fullname,{min:3,max:255})){
        errors.fullname = "fullname must > 3 và < 5 character"
    }


    //validate userType
    if(validator.isEmpty(userType)){
        errors.userType = "Usertype is requỉed"
    }else if(!validator.equals(userType,"admin") && !validator.equals(userType,"client")){
        errors.userType = "usertype is invalid"
    }
    if(_.isEmpty(errors)) return next();
    return res.status(400).json(errors)


    
}