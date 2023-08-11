const { createOrderSchema, getIdOrderSchema } = require("../validation/orders-validation.js");
const { getByUsernameSchema } = require("../validation/users-validation.js");
const { validate } = require("../validation/validation.js");
const { Users, Orders, Products } = require("../../models");
const { ResponseError } = require("../error/response-error.js");
const { STATUS_ORDER } = require("../enum/status-order.js");

const createOrder = async (username, request) => {
    username = validate(getByUsernameSchema, username);
    const requestOrder = validate(createOrderSchema, request);

    const user = await Users.findByPk(username);
    if (user === null) {
        throw new ResponseError(404, "User Not Found");
    }

    const product = await Products.findByPk(requestOrder.productId);
    if (product === null) {
        throw new ResponseError(404, "Product Not Found");
    }

    if (product.stock < requestOrder.quantity) {
        throw new ResponseError(400, "Stock not Enough")
    }

    const totalPrice = requestOrder.quantity * product.price;
    const orderCreate = {
        orderNumber: generateOrderNumber(),
        orderDate: new Date(),
        quantity: requestOrder.quantity,
        total: totalPrice,
        statusOrder: STATUS_ORDER.DELIVERY,
        isActive: 1,
        username: user.username,
        productId: requestOrder.productId
    }
    const order = await Orders.create(orderCreate);
    product.stock = product.stock - requestOrder.quantity;
    await product.save();
    return order
}

const orderDone = async (id) => {
    id = validate(getIdOrderSchema, id);

    const order = await Orders.findByPk(id);
    if (order === null) {
        throw new ResponseError(404, "Order not Found")
    }

    order.statusOrder = STATUS_ORDER.DONE;
    order.isActive = 0;
    return await order.save();
}

const generateOrderNumber = () => {
    const date = new Date().getTime().toString();
    const result = `ORDER - ${date}`
    return result;
}

module.exports = {
    createOrder,
    orderDone
}