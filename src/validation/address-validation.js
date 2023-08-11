const Joi = require("joi");

const createUpdateAddressSchema = Joi.object({
    street: Joi.string().max(255).allow(null).allow("").optional(),
    city: Joi.string().max(255).allow(null).allow("").optional(),
    province: Joi.string().max(255).allow(null).allow("").optional(),
    country: Joi.string().max(255).required(),
    postalCode: Joi.string().max(255).required()
});

const validIdSchema = Joi.number().required();

module.exports = {
    createUpdateAddressSchema,
    validIdSchema
}