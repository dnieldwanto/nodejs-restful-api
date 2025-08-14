const Joi = require("joi");

const createUpdateCategorySchema = Joi.object({
    categoryName: Joi.string().max(100).required(),
    description: Joi.string().max(255).allow(null).allow("").optional()
});

const getByIdSchema = Joi.number().required();

module.exports = {
    createUpdateCategorySchema,
    getByIdSchema
};