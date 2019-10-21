
const Joi = require('@hapi/joi')

const registerValidation = data => {
    const schema = {
        name: Joi.string().min(6).required(),
        email: Joi.string().min(6).required().email(),
        job: Joi.string().min(3).required(),
        gender: Joi.string().min(4).required(),
        status: Joi.string().min(3).required(),
        password: Joi.string().min(6).required(),
        phonenumber: Joi.string().min(12).required()
    }
    return Joi.validate(data, schema)
}

const loginValidation = data => {
    const schema = {
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required()
    }
    return Joi.validate(data, schema)
}


module.exports.registerValidation = registerValidation
module.exports.loginValidation = loginValidation