const Joi = require("joi");

const createOrderSchema = Joi.object({
    quantity: Joi.number().default(0).optional(),
    productId: Joi.number().required()
});

const getIdOrderSchema = Joi.string().required();

module.exports = {
    createOrderSchema,
    getIdOrderSchema
}