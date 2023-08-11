const categoryService = require("../service/category-service.js");

const create = async (req, res, next) => {
    try {
        const result = await categoryService.createCategory(req.body);
        res.json({
            status: 200,
            message: "OK",
            data: result
        });
    } catch (e) {
        next(e);
    }
}

const update = async (req, res, next) => {
    try {
        const id = req.params.id;
        const result = await categoryService.updateCategory(id, req.body);
        res.json({
            status: 200,
            message: "OK",
            data: result
        });
    } catch (e) {
        next(e);
    }
}

const categoryDelete = async (req, res, next) => {
    try {
        const id = req.params.id;
        await categoryService.deleteCategory(id);
        res.json({
            status: 200,
            message: "OK",
        });
    } catch (e) {
        next(e);
    }
}

const getById = async (req, res, next) => {
    try {
        const id = req.params.id;
        const result = await categoryService.getCategoryById(id);
        res.json({
            status: 200,
            message: "OK",
            data: result
        });
    } catch (e) {
        next(e);
    }
}

const getAll = async (req, res, next) => {
    try {
        const result = await categoryService.getAllCategory();
        res.json({
            status: 200,
            message: "OK",
            data: result
        });
    } catch (e) {
        next(e);
    }
}

module.exports = {
    create,
    update,
    categoryDelete,
    getById,
    getAll
}