const productService = require("../service/product-service.js");

const create = async (req, res, next) => {
    try {
        const result = await productService.createProduct(req.body);
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
        const result = await productService.updateProduct(id, req.body);
        res.json({
            status: 200,
            message: "OK",
            data: result
        });
    } catch (e) {
        next(e);
    }
}

const getProductById = async (req, res, next) => {
    try {
        const id = req.params.id;
        const result = await productService.getById(id);
        res.json({
            status: 200,
            message: "OK",
            data: result
        });
    } catch (e) {
        next(e);
    }
}

const getAllProduct = async (req, res, next) => {
    try {
        const result = await productService.getAll();
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
    getProductById,
    getAllProduct
}