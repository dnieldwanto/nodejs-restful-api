const Joi = require("joi");

const createUpdateProductSchema = Joi.object({
    productName: Joi.string().max(100).required(),
    price: Joi.number().allow(null).default(0).optional(),
    stock: Joi.number().allow(null).default(0).optional(),
    categoryId: Joi.number().required(),
    supplierId: Joi.number().required()
});

const idSchema = Joi.number().required()

module.exports = {
    createUpdateProductSchema,
    idSchema
}