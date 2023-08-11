const { Categories } = require("../../models");
const { ResponseError } = require("../error/response-error.js");
const { createUpdateCategorySchema, getByIdSchema } = require("../validation/category-validation.js");
const { validate } = require("../validation/validation.js");

const createCategory = async (request) => {
    const category = validate(createUpdateCategorySchema, request);
    return await Categories.create(category);
}

const updateCategory = async (id, request) => {
    id = validate(getByIdSchema, id);
    const requestCategory = validate(createUpdateCategorySchema, request);

    const category = await Categories.findByPk(id);
    if (category === null) {
        throw new ResponseError(404, "Category Not Found");
    }

    category.categoryName = requestCategory.categoryName;
    category.description = requestCategory.description;
    return await category.save();
}

const deleteCategory = async (id) => {
    id = validate(getByIdSchema, id);

    const category = await Categories.findByPk(id);
    if (category === null) {
        throw new ResponseError(404, "Category Not Found");
    }

    return await category.destroy();
}

const getCategoryById = async (id) => {
    id = validate(getByIdSchema, id);
    const category = await Categories.findByPk(id, {
        include: ["products"]
    });
    if (category === null) {
        throw new ResponseError(404, "Category Not Found");
    }

    return category;
}

const getAllCategory = async () => {
    const category = await Categories.findAll({
        include: ["products"],
        order: [["id", "asc"]]
    });
    return category;
}

module.exports = {
    createCategory,
    updateCategory,
    deleteCategory,
    getCategoryById,
    getAllCategory
}