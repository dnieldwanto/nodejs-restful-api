const Joi = require("joi");

const getByUsernameSchema = Joi.string().required();

const getByIdSchema = Joi.number().required();

const updateUsersSchema = Joi.object({
    password: Joi.string().max(100).optional()
})

module.exports = {
    getByUsernameSchema,
    getByIdSchema,
    updateUsersSchema
}