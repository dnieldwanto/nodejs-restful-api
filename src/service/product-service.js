const { createUpdateProductSchema, idSchema } = require("../validation/products-validation.js")
const { validate } = require("../validation/validation.js")
const db = require("../utilities/database");
const { ResponseError } = require("../error/response-error.js");

const createProduct = async (request) => {
    const product = validate(createUpdateProductSchema, request);

    const category = await db.findByPrimaryKey(product.categoryId, "Categories", ["categoryName", "description"]);
    if (category === null) {
        throw new ResponseError(404, "Category Not Found")
    }

    const supplier = await db.findByPrimaryKey(product.supplierId, "Suppliers", ["supplierName", "supplierAddress", "supplierPhone"]);
    if (supplier === null) {
        throw new ResponseError(404, "Supplier Not Found");
    }

    await db.saveData(product, "Products");
    return product;
}

const updateProduct = async (id, request) => {
    id = validate(idSchema, id);
    const productRequest = validate(createUpdateProductSchema, request);

    const product = await db.findByPrimaryKey(id, "Products", ["productName", "price", "stock", "categoryId", "supplierId"])
    if (product === null) {
        throw new ResponseError(404, "Product Not Found");
    }

    const category = await db.findByPrimaryKey(product.categoryId, "Categories", ["categoryName", "description"]);
    if (category === null) {
        throw new ResponseError(404, "Category Not Found")
    }

    const supplier = await db.findByPrimaryKey(product.supplierId, "Suppliers", ["supplierName", "supplierAddress", "supplierPhone"]);
    if (supplier === null) {
        throw new ResponseError(404, "Supplier Not Found");
    }

    const payload = {
        productName: productRequest.productName,
        price: productRequest.price,
        stock: productRequest.stock,
        categoryId: productRequest.categoryId,
        supplierId: productRequest.supplierId
    }
    await db.updateData({id: id}, payload, "Products");
    return payload;
}

const getById = async(id) => {
    id = validate(idSchema, id);
    const product = await db.findOneByCondition({id: id}, "Products", ["productName", "price", "stock"], ["orders"]);
    if (product === null) {
        throw new ResponseError(404, "Product Not Found");
    }
    return product;
}

const getAll = async() => {
    return await db.findAllData({}, "Products", [["id", "asc"]], ["productName", "price", "stock"], ["categories", "suppliers"])
}

module.exports = {
    createProduct,
    updateProduct,
    getById,
    getAll
}