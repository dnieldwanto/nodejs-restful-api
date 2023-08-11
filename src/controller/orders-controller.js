const orderService = require("../service/orders-service.js")

const create = async (req, res, next) => {
    try {
        const username = req.user.username;
        const result = await orderService.createOrder(username, req.body);
        res.json({
            status: 200,
            message: "OK",
            data: result
        });
    } catch (e) {
        next(e);
    }
}

const done = async (req, res, next) => {
    try {
        const id = req.params.id;
        const result = await orderService.orderDone(id);
        res.json({
            status: 200,
            message: "OK",
            data: result
        });
    } catch (e) {
        next(e);
    }
}

module.exports = {
    create,
    done
}