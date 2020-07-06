const _ = require("lodash");
const validator = require("validator");
const {Station} = require("../../../models/Station")

const validatePostStation = async (req,res,next) => {
    let errors = {};
    const name = _.get(req.body,"name","");
    const address = _.get(req.body,"address","");
    const province = _.get(req.body,"province","");


    //validate name
    if(validator.isEmpty(name)){
        errors.name = "Name is required"
    }else{
        const station = await Station.findOne({name})
        if(station) errors.name = "Name exists"
    }

    //validate 

    if(_.isEmpty(errors)) return next()
    return res.status(400).json(errors)
}

module.exports = {
    validatePostStation
}