const db = require("../utilities/database");
const { ResponseError } = require("../error/response-error.js");
const { createUpdateCategorySchema, getByIdSchema } = require("../validation/category-validation.js");
const { validate } = require("../validation/validation.js");
const elasticsearch = require("../utilities/elasticsearch");

const createCategory = async (request) => {
    const category = validate(createUpdateCategorySchema, request);
    await db.saveData(category, "Categories");
    const newCategory = await db.findOneByCondition({categoryName: category.categoryName}, "Categories", ["id"]);
    elasticsearch.insertDoc("category", newCategory.id, category);
    return category;
};

const updateCategory = async (id, request) => {
    id = validate(getByIdSchema, id);
    const requestCategory = validate(createUpdateCategorySchema, request);

    const category = await db.findByPrimaryKey(id, "Categories", ["id", "categoryName", "description"]);
    if (category === null) {
        throw new ResponseError(404, "Category Not Found");
    }
    const payload = {
        categoryName: requestCategory.categoryName,
        description: requestCategory.description
    };
    await db.updateData({id: id}, payload, "Categories");
    elasticsearch.updateDoc("category", category.id, payload);
    return payload;
};

const deleteCategory = async (id) => {
    id = validate(getByIdSchema, id);
    return await db.deleteData({id: id}, "Categories");
};

const getCategoryById = async (id) => {
    id = validate(getByIdSchema, id);
    const category = await db.findByPrimaryKey(id, "Categories", ["categoryName", "description"]);
    if (category === null) {
        throw new ResponseError(404, "Category Not Found");
    }

    return category;
};

const getAllCategory = async () => {
    const category = await db.findAllData({}, "Categories", [["id", "asc"]], ["categoryName", "description"], ["products"]);
    return category;
};

module.exports = {
    createCategory,
    updateCategory,
    deleteCategory,
    getCategoryById,
    getAllCategory
};