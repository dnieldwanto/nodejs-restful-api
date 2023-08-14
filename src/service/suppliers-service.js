const { createUpdateSupplierSchema, getByIdSchema } = require("../validation/suppliers-validation.js");
const { validate } = require("../validation/validation.js");
const { Suppliers } = require("../models");
const { ResponseError } = require("../error/response-error.js");

const createSupplier = async(request) => {
    const supplier = validate(createUpdateSupplierSchema, request);
    return await Suppliers.create(supplier);
}

const updateSupplier = async(id, request) => {
    id = validate(getByIdSchema, id);
    const supplierRequest = validate(createUpdateSupplierSchema, request);

    const supplier = await Suppliers.findByPk(id);
    if (supplier === null) {
        throw new ResponseError(404, "Supplier Not Found");
    }

    supplier.supplierName = supplierRequest.supplierName;
    supplier.supplierAddress = supplierRequest.supplierAddress;
    supplier.supplierPhone = supplierRequest.supplierPhone;
    return await supplier.save();
}

const deleteSupplier = async (id) => {
    id = validate(getByIdSchema, id);
    const supplier = await Suppliers.findByPk(id);
    if (supplier === null) {
        throw new ResponseError(404, "Supplier Not Found");
    }
    return await supplier.destroy();
}

const getSupplierById = async(id) => {
    id = validate(getByIdSchema, id);
    const supplier = await Suppliers.findByPk(id, {
        include: ["products"]
    });
    if (supplier === null) {
        throw new ResponseError(404, "Supplier Not Found");
    }
    return supplier;
}

const getAllSupplier = async () => {
    const supplier = await Suppliers.findAll({
        include: ["products"],
        order: [["id", "asc"]]
    });
    return supplier;
}

module.exports = {
    createSupplier,
    updateSupplier,
    deleteSupplier,
    getSupplierById,
    getAllSupplier
}