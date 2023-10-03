const cartService = require("../service/carts-service.js");

const allCarts = async (req, res, next) => {
    try {
        const result = await cartService.getAllCarts();
        req.data = result;
        next();
    } catch (e) {
        next(e);
    }
}

const getCartByUsername = async (req, res, next) => {
    try {
        const username = req.user.username;
        const result = await cartService.getAllCartsByUsername(username);
        req.data = result;
        next();
    } catch (e) {
        next(e);
    }
}

const addToCarts = async (req, res, next) => {
    try {
        const body = req.body;
        const username = req.user.username;
        const result = await cartService.addToCart(body, username);
        req.data = result;
        req.message = "Successfully add to your cart"
        next();
    } catch (e) {
        next(e);
    }
}

const deleteCart = async (req, res, next) => {
    try {
        const id = req.params.id;
        await cartService.deleteCart(id);
        req.message = "Successfully deleted your cart"
        next()
    } catch (e) {
        next(e);
    }
}

module.exports = {
    allCarts,
    getCartByUsername,
    addToCarts,
    deleteCart
}