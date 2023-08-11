const { createUpdateProductSchema, idSchema } = require("../validation/products-validation.js")
const { validate } = require("../validation/validation.js")
const { Categories, Suppliers, Products } = require("../../models");
const { ResponseError } = require("../error/response-error.js");

const createProduct = async (request) => {
    const product = validate(createUpdateProductSchema, request);

    const category = await Categories.findByPk(product.categoryId);
    if (category === null) {
        throw new ResponseError(404, "Category Not Found")
    }

    const supplier = await Suppliers.findByPk(product.supplierId);
    if (supplier === null) {
        throw new ResponseError(404, "Supplier Not Found");
    }

    return await Products.create(product);
}

const updateProduct = async (id, request) => {
    id = validate(idSchema, id);
    const productRequest = validate(createUpdateProductSchema, request);

    const product = await Products.findByPk(id);
    if (product === null) {
        throw new ResponseError(404, "Product Not Found");
    }

    const category = await Categories.findByPk(productRequest.categoryId);
    if (category === null) {
        throw new ResponseError(404, "Category Not Found")
    }

    const supplier = await Suppliers.findByPk(productRequest.supplierId);
    if (supplier === null) {
        throw new ResponseError(404, "Supplier Not Found");
    }

    product.productName = productRequest.productName;
    product.price = productRequest.price;
    product.stock = productRequest.stock;
    product.categoryId = productRequest.categoryId;
    product.supplierId = productRequest.supplierId;
    return await product.save();
}

const getById = async(id) => {
    id = validate(idSchema, id);
    const product = await Products.findByPk(id, {
        include: ["categories", "suppliers"],
        attributes: ["productName", "price", "stock"]
    });
    if (product === null) {
        throw new ResponseError(404, "Product Not Found");
    }
    return product;
}

const getAll = async() => {
    return await Products.findAll({
        include: ["categories", "suppliers"],
        attributes: ["productName", "price", "stock"],
        order: [["id", "asc"]]
    });
}

module.exports = {
    createProduct,
    updateProduct,
    getById,
    getAll
}