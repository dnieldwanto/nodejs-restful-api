const { createUpdateProductSchema, idSchema } = require("../validation/products-validation.js");
const { validate } = require("../validation/validation.js");
const db = require("../utilities/database");
const elasticsearch = require("../utilities/elasticsearch");
const { ResponseError } = require("../error/response-error.js");

const createProduct = async (request, file) => {
    const product = validate(createUpdateProductSchema, request);

    const checkProduct = await db.findOneByCondition({productName: product.productName}, "Products");
    if (checkProduct) {
        throw new ResponseError(400, "Products already exist. If you want to update, please go to the update page. Thanks");
    }

    const category = await db.findByPrimaryKey(product.categoryId, "Categories", ["categoryName", "description"]);
    if (category === null) {
        throw new ResponseError(404, "Category Not Found");
    }

    const supplier = await db.findByPrimaryKey(product.supplierId, "Suppliers", ["supplierName", "supplierAddress", "supplierPhone"]);
    if (supplier === null) {
        throw new ResponseError(404, "Supplier Not Found");
    }

    await db.saveData(product, "Products");
    const newProduct = await db.findOneByCondition({productName: product.productName}, "Products", ["id"]);
    elasticsearch.insertDoc("products", newProduct.id, product);

    if (file !== undefined) {
        const splitFile = file.originalname.split(".");
        const originalFilename = splitFile[0];
        const extensionFilename = splitFile[1];
        const splitPhysicalName = file.path.split("\\");
        const physicalName = splitPhysicalName[1];
        const physicalFilename = physicalName.split(".")[0];
        const payload_image = {
            product_id: newProduct.id,
            original_filename: originalFilename,
            physical_filename: physicalFilename,
            extension_filename: "." + extensionFilename,
            created_at: new Date(),
            updated_at: new Date()
        };
        await db.saveData(payload_image, "ProductsImage");
    }

    const productImage = await db.findOneByCondition({product_id: newProduct.id}, "ProductsImage", ["physical_filename", "extension_filename"]);
    const response = {
        productName: product.productName,
        price: product.price,
        stock: product.stock,
        category: {
            name: category.categoryName
        },
        supplier: {
            supplierName: supplier.supplierName,
            supplierAddress: supplier.supplierAddress,
            supplierPhone: supplier.supplierPhone
        },
        image: productImage !== null ? productImage.physical_filename + "" + productImage.extension_filename : null
    };
    return response;
};

const updateProduct = async (id, request, file) => {
    id = validate(idSchema, id);
    const productRequest = validate(createUpdateProductSchema, request);

    const product = await db.findByPrimaryKey(id, "Products", ["id", "productName", "price", "stock", "categoryId", "supplierId"]);
    if (product === null) {
        throw new ResponseError(404, "Product Not Found");
    }

    const category = await db.findByPrimaryKey(product.categoryId, "Categories", ["categoryName", "description"]);
    if (category === null) {
        throw new ResponseError(404, "Category Not Found");
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
    };
    await db.updateData({id: id}, payload, "Products");
    elasticsearch.updateDoc("products", product.id, payload);

    if (file !== undefined) {
        const splitFile = file.originalname.split(".");
        const originalFilename = splitFile[0];
        const extensionFilename = splitFile[1];
        const splitPhysicalName = file.path.split("\\");
        const physicalName = splitPhysicalName[1];
        const physicalFilename = physicalName.split(".")[0];
        const payload_image = {
            product_id: product.id,
            original_filename: originalFilename,
            physical_filename: physicalFilename,
            extension_filename: "." + extensionFilename,
            created_at: new Date(),
            updated_at: new Date()
        };
        await db.saveData(payload_image, "ProductsImage");
    }

    const productImage = await db.findOneByCondition({product_id: product.id}, "ProductsImage", ["physical_filename", "extension_filename"]);
    const response = {
        productName: product.productName,
        price: product.price,
        stock: product.stock,
        category: {
            name: category.categoryName
        },
        supplier: {
            supplierName: supplier.supplierName,
            supplierAddress: supplier.supplierAddress,
            supplierPhone: supplier.supplierPhone
        },
        image: productImage !== null ? productImage.physical_filename + "" + productImage.extension_filename : null
    };
    return response;
};

const getById = async(id) => {
    id = validate(idSchema, id);
    const product = await db.findOneByCondition({id: id}, "Products", ["productName", "price", "stock"]);
    if (product === null) {
        throw new ResponseError(404, "Product Not Found");
    }
    return product;
};

const getAll = async() => {
    let response = [];
    const products = await db.findAllData({}, "Products", [["id", "asc"]], ["id", "productName", "price", "stock", "categoryId", "supplierId"]);
    for (let i = 0; i < products.length; i++) {
        const category = await db.findByPrimaryKey(products[i].categoryId, "Categories", ["categoryName", "description"]);
        const supplier = await db.findByPrimaryKey(products[i].supplierId, "Suppliers", ["supplierName", "supplierAddress", "supplierPhone"]);
        const productImage = await db.findOneByCondition({product_id: products[i].id}, "ProductsImage", ["physical_filename", "extension_filename"]);
        const data = {
            productName: products[i].productName,
            price: products[i].price,
            stock: products[i].stock,
            category: {
                categoryName: category.categoryName
            },
            supplier: {
                supplierName: supplier.supplierName,
                supplierAddress: supplier.supplierAddress,
                supplierPhone: supplier.supplierPhone
            },
            image: productImage !== null ? "localhost:3000/image/" + productImage.physical_filename + "" + productImage.extension_filename : null
        };
        response.push(data);
    }
    return response;
};

const esTextSearch = async (productName) => {
    let whereTo = "products";

    let productsQuery = {
        query_string: {
            query: `${productName}`,
            fields: ["productName"]
        }
    };

    let productSortArray = [
        {
            price: {
                order: "desc"
            }
        }
    ];

    const productData = await elasticsearch.searchInIndex(
        whereTo,
        productsQuery,
        0,
        10,
        [
            "productName",
            "price",
            "stock"
        ],
        productSortArray
    );

    const result = productData.hits.hits;

    if (result.length === 0) {
        throw new ResponseError(404, "Data Not Found");
    }

    let response = [];

    for (let data of result) {
        let product = data._source;
        response.push(product);
    }
    return response;
};

module.exports = {
    createProduct,
    updateProduct,
    getById,
    getAll,
    esTextSearch
};