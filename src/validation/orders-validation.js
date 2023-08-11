const Joi = require("joi");

const createOrderSchema = Joi.object({
    quantity: Joi.number().default(0).optional(),
    productId: Joi.number().required()
});

const getIdOrderSchema = Joi.number().required();

module.exports = {
    createOrderSchema,
    getIdOrderSchema
}