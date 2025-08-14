const Joi = require("joi");

const createUpdateContactSchema = Joi.object({
    firstName: Joi.string().max(100).required(),
    lastName: Joi.string().max(100).allow(null).allow("").optional(),
    email: Joi.string().email().max(100).allow(null).allow("").optional(),
    phone: Joi.string().max(20).allow(null).allow("").optional()
});

const getIdSchema = Joi.number().required();

module.exports = {
    createUpdateContactSchema,
    getIdSchema
};