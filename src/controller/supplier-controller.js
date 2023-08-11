const supplierService = require("../service/suppliers-service.js")

const create = async (req, res, next) => {
    try {
        const result = await supplierService.createSupplier(req.body);
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
        const result = await supplierService.updateSupplier(id, req.body);
        res.json({
            status: 200,
            message: "OK",
            data: result
        });
    } catch (e) {
        next(e);
    }
}

const supplierDelete = async (req, res, next) => {
    try {
        const id = req.params.id;
        await supplierService.deleteSupplier(id);
        res.json({
            status: 200,
            message: "OK"
        });
    } catch (e) {
        next(e);
    }
}

const getById = async (req, res, next) => {
    try {
        const id = req.params.id;
        const result = await supplierService.getSupplierById(id);
        res.json({
            status: 200,
            message: "OK",
            data: result
        });
    } catch (e) {
        next(e);
    }
}

const getAll = async(req, res, next) => {
    try {
        const result = await supplierService.getAllSupplier();
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
    supplierDelete,
    getById,
    getAll
}