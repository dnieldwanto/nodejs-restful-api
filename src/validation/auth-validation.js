const Joi = require("joi");
const regex = require("./regex");

const createUser = Joi.object({
    firstName: Joi.string().max(100).required(),
    lastName: Joi.string().max(100).allow(null).allow("").optional(),
    email: Joi.string().email().max(100).allow(null).allow("").optional(),
    username: Joi.string().regex(regex.validateUsername).required().messages({
        "string.pattern.base": "Username must have combination number and at least 8 characters"
    }),
    password: Joi.string().trim().regex(regex.validatePassword).required().messages({
        "string.pattern.base": "Password must have combination characters and at least 8 characters"
    })
});

const loginUserSchema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required()
});

module.exports = {
    createUser,
    loginUserSchema
};