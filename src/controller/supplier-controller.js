const supplierService = require("../service/suppliers-service.js")

const create = async (req, res, next) => {
    try {
        const result = await supplierService.createSupplier(req.body);
        req.data = result;
        next();
    } catch (e) {
        next(e);
    }
}

const update = async (req, res, next) => {
    try {
        const id = req.params.id;
        const result = await supplierService.updateSupplier(id, req.body);
        req.data = result;
        next();
    } catch (e) {
        next(e);
    }
}

const supplierDelete = async (req, res, next) => {
    try {
        const id = req.params.id;
        await supplierService.deleteSupplier(id);
        req.message = "Successfully delete suppliers";
        next();
    } catch (e) {
        next(e);
    }
}

const getById = async (req, res, next) => {
    try {
        const id = req.params.id;
        const result = await supplierService.getSupplierById(id);
        req.data = result;
        next();
    } catch (e) {
        next(e);
    }
}

const getAll = async(req, res, next) => {
    try {
        const result = await supplierService.getAllSupplier();
        req.data = result;
        next();
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