const { createOrderSchema, getIdOrderSchema } = require("../validation/orders-validation.js");
const { getByUsernameSchema } = require("../validation/users-validation.js");
const { validate } = require("../validation/validation.js");
const db = require("../utilities/database")
const Orders = require("../db/models/mongodb/orders")
const { ResponseError } = require("../error/response-error.js");
const { STATUS_ORDER } = require("../enum/status-order.js");

const createOrder = async (username, request) => {
    username = validate(getByUsernameSchema, username);
    const requestOrder = validate(createOrderSchema, request);

    const user = await db.findByPrimaryKey(username, "Users", ["username"]);
    if (user === null) {
        throw new ResponseError(404, "User Not Found");
    }

    const product = await db.findByPrimaryKey(requestOrder.productId, "Products", ["productName", "price", "stock"]);
    if (product === null) {
        throw new ResponseError(404, "Product Not Found");
    }

    if (product.stock < requestOrder.quantity) {
        throw new ResponseError(400, "Stock not Enough")
    }

    const totalPrice = requestOrder.quantity * product.price;
    const orderCreate = new Orders({
        orderNumber: generateOrderNumber(),
        orderDate: new Date(),
        quantity: requestOrder.quantity,
        total: totalPrice,
        statusOrder: STATUS_ORDER.DELIVERY,
        isActive: 1,
        username: user.username,
        productId: requestOrder.productId
    })
    // await db.saveData(orderCreate, "Orders");
    await orderCreate.save()
    const payload = {
        stock: product.stock - requestOrder.quantity
    }
    await db.updateData({id: requestOrder.productId}, payload, "Products")
    return orderCreate
}

const orderDone = async (id) => {
    id = validate(getIdOrderSchema, id);

    // const order = await db.findByPrimaryKey(id, "Orders", ["id", "orderNumber", "orderDate", "quantity", "total", "username", "productId", "statusOrder", "isActive"])
    const order = Orders.findOne({
        _id: id
    })
    if (order === null) {
        throw new ResponseError(400, "Order Already Done")
    }

    const payload = {
        statusOrder: STATUS_ORDER.DONE,
        isActive: 0
    }
    await order.updateOne({}, {
        $set: payload
    }).exec()
    // await db.updateData({id: id}, payload, "Orders");
}

const getAllOrders = async(id) => {
    const allOrders = Orders.findOne({_id: id}).select("orderNumber orderDate quantity total statusOrder")
    return allOrders
}

const generateOrderNumber = () => {
    const date = new Date().getTime().toString();
    const result = `ORDER - ${date}`
    return result;
}

module.exports = {
    createOrder,
    orderDone,
    getAllOrders
}