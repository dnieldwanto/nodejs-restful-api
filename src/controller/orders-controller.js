const orderService = require("../service/orders-service.js")

const create = async (req, res, next) => {
    try {
        const username = req.user.username;
        const idCart = req.params.id_cart;
        const result = await orderService.createOrder(username, idCart, req.body);
        req.data = result;
        next();
    } catch (e) {
        next(e);
    }
}

const orderDetails = async (req, res, next) => {
    try {
        const payload = req.body;
        const result = await orderService.getOrderDetails(payload);
        req.data = result;
        next();
    } catch (e) {
        next(e);
    }
}

const done = async (req, res, next) => {
    try {
        const id = req.params.id;
        const result = await orderService.orderDone(id);
        req.data = result;
        req.message = "Order done successfully"
        next();
    } catch (e) {
        next(e);
    }
}

const allOrders = async(req, res, next) => {
    try {
        const result = await orderService.getAllOrders()
        req.data = result;
        next();
    } catch (e) {
        next(e)
    }
}

module.exports = {
    create,
    done,
    allOrders,
    orderDetails
}