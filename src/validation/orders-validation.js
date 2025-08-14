const Joi = require("joi");

const createOrderSchema = Joi.object({
    typePayment: Joi.string().required(),
    bankName: Joi.string().optional().allow(null),
    shipCost: Joi.number().required(),
    discountVoucher: Joi.string().optional().allow(null).allow(""),
    quantity: Joi.number().required()
});

const orderDetailsSchema = Joi.object({
    orderNumber: Joi.string().required(),
    username: Joi.string().required()
});

const getIdOrderSchema = Joi.string().required();

module.exports = {
    createOrderSchema,
    getIdOrderSchema,
    orderDetailsSchema
};