const { createUpdateSupplierSchema, getByIdSchema } = require("../validation/suppliers-validation.js");
const { validate } = require("../validation/validation.js");
const db = require("../utilities/database");
const { ResponseError } = require("../error/response-error.js");
const elasticsearch = require("../utilities/elasticsearch")

const createSupplier = async(request) => {
    const supplier = validate(createUpdateSupplierSchema, request);
    await db.saveData(supplier, "Suppliers");
    const newSupplier = await db.findOneByCondition({supplierName: supplier.supplierName}, "Suppliers", ["id"])
    elasticsearch.insertDoc("supplier", newSupplier.id, supplier);
    return supplier;
}

const updateSupplier = async(id, request) => {
    id = validate(getByIdSchema, id);
    const supplierRequest = validate(createUpdateSupplierSchema, request);

    const supplier = await db.findByPrimaryKey(id, "Suppliers", ["id", "supplierName", "supplierAddress", "supplierPhone"])
    if (supplier === null) {
        throw new ResponseError(404, "Supplier Not Found");
    }

    const payload = {
        supplierName: supplierRequest.supplierName,
        supplierAddress: supplierRequest.supplierAddress,
        supplierPhone: supplierRequest.supplierPhone
    }
    await db.updateData({id: id}, payload, "Suppliers");
    elasticsearch.updateDoc("supplier", supplier.id, payload);
    return payload
}

const deleteSupplier = async (id) => {
    id = validate(getByIdSchema, id);
    return await db.deleteData({id: id}, "Suppliers");
}

const getSupplierById = async(id) => {
    id = validate(getByIdSchema, id);
    const supplier = await db.findByPrimaryKey(id, "Suppliers", ["supplierName", "supplierAddress", "supplierPhone"]);
    if (supplier === null) {
        throw new ResponseError(404, "Supplier Not Found");
    }
    return supplier;
}

const getAllSupplier = async () => {
    const supplier = await db.findAllData({}, "Suppliers", [["id", "asc"]], ["supplierName", "supplierAddress", "supplierPhone"], ["products"]);
    return supplier;
}

module.exports = {
    createSupplier,
    updateSupplier,
    deleteSupplier,
    getSupplierById,
    getAllSupplier
}