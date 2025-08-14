const {validate} = require("../validation/validation.js");
const { getByUsernameSchema } = require("../validation/users-validation.js");
const db = require("../utilities/database");
const { ResponseError } = require("../error/response-error.js");
const { addToCartSchema, idSchema } = require("../validation/cart-validation.js");

const getAllCarts = async () => {
    const carts = await db.findAllData({}, "Carts", [["id", "desc"]], ["productId", "username", "quantity", "totalPayment"]);
    return carts;
};

const getAllCartsByUsername = async (username) => {
    username = validate(getByUsernameSchema, username);

    const users = await db.findByPrimaryKey(username, "Users", ["username", "createdAt", "updatedAt"]);
    if (!users) {
        throw new ResponseError(404, "User Not Found");
    }

    const carts = await db.findAllData({username: username}, "Carts", [["id", "desc"]], ["productId", "username", "quantity", "totalPayment"]);
    if (carts < 0) {
        throw new ResponseError(404, "Carts Not Found");
    }

    let product = [];
    let totalQuantity = 0;
    let totalPayment = 0;

    for (let cart of carts) {
        const products = await db.findByPrimaryKey(cart.productId, "Products", ["productName", "price"]);
        let data = {
            productName: products.productName,
            price: products.price,
            quantity: cart.quantity,
            payment: cart.totalPayment
        };

        totalQuantity += cart.quantity;
        totalPayment += parseInt(cart.totalPayment);
        product.push(data);
    }

    let response = {
        username: users.username,
        products: product,
        quantity: totalQuantity,
        totalPayment: totalPayment
    };

    return response;
};

const addToCart = async (request, username) => {
    username = validate(getByUsernameSchema, username);
    const payload = validate(addToCartSchema, request);

    const users = await db.findByPrimaryKey(username, "Users", ["username", "createdAt", "updatedAt"]);
    if (!users) {
        throw new ResponseError(404, "User Not Found");
    }

    const products = await db.findByPrimaryKey(payload.productId, "Products", ["productName", "price", "stock", "categoryId", "supplierId"]);
    if (!products) {
        throw new ResponseError(404, "Products Not Found");
    }

    if (products.stock < payload.quantity) {
        throw new ResponseError(400, "Not Enough Stock");
    }

    const checkCart = await db.findOneByCondition({
        username: username,
        productId: payload.productId
    }, "Carts", ["id", "username", "productId", "quantity", "totalPayment", "created_at", "updated_at"]);

    let totalPrice = 0;
    let data = {};
    if (checkCart) {
        totalPrice = payload.quantity * products.price;
        const newTotal = parseInt(checkCart.totalPayment) + totalPrice;
        data = {
            productId: payload.productId,
            username: username,
            quantity: payload.quantity + checkCart.quantity,
            totalPayment: newTotal,
            created_at: checkCart.created_at,
            updated_at: new Date().toISOString()
        };
        await db.updateData({id: checkCart.id}, data, "Carts");
    } else {
        totalPrice = payload.quantity * products.price;
        data = {
            productId: payload.productId,
            username: username,
            quantity: payload.quantity,
            totalPayment: totalPrice,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
        };
        await db.saveData(data, "Carts");
    }

    return data;
};

const deleteCart = async (id) => {
    id = validate(idSchema, id);

    const cart = await db.findByPrimaryKey(id, "Carts", ["id", "username", "productId", "quantity", "totalPayment"]);
    if (!cart) {
        throw new ResponseError(404, "Cart Not Found");
    }

    await db.deleteData({id: cart.id}, "Carts");
}; 

module.exports = {
    getAllCarts,
    getAllCartsByUsername,
    addToCart,
    deleteCart
};