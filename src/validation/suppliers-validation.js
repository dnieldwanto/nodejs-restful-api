const Joi = require("joi");

const createUpdateSupplierSchema = Joi.object({
    supplierName: Joi.string().max(100).required(),
    supplierAddress: Joi.string().max(255).allow(null).allow("").optional(),
    supplierPhone: Joi.string().max(255).allow(null).allow("").optional()
});

const getByIdSchema = Joi.number().required();

module.exports = {
    createUpdateSupplierSchema,
    getByIdSchema
};