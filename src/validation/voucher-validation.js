const Joi = require("joi");

const createVoucherSchema = Joi.object({
    voucherCode: Joi.string().required(),
    discountVoucher: Joi.number().required()
});

module.exports = {
    createVoucherSchema
};