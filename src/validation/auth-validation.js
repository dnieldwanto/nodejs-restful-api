const Joi = require("joi");

const createUser = Joi.object({
    username: Joi.string().max(10).required(),
    password: Joi.string().max(100).required()
});

const loginUserSchema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required()
})

module.exports = {
    createUser,
    loginUserSchema
}