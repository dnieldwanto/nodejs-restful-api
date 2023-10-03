const Joi = require("joi")

const addToCartSchema = Joi.object({
    productId: Joi.number().required(),
    quantity: Joi.number().required()
})

const idSchema = Joi.number().required();

module.exports = {
    addToCartSchema,
    idSchema
}