const orderService = require("../service/orders-service.js")

const create = async (req, res, next) => {
    try {
        const username = req.user.username;
        const result = await orderService.createOrder(username, req.body);
        req.data = result;
        next();
    } catch (e) {
        next(e);
    }
}

const done = async (req, res, next) => {
    try {
        const id = req.params.id;
        await orderService.orderDone(id);
        req.message = "Order done successfully"
        next();
    } catch (e) {
        next(e);
    }
}

const allOrders = async(req, res, next) => {
    try {
        const id = req.params.id;
        const result = await orderService.getAllOrders(id)
        req.data = result;
        next();
    } catch (e) {
        next(e)
    }
}

module.exports = {
    create,
    done,
    allOrders
}