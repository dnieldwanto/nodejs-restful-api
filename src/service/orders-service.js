const { createOrderSchema, getIdOrderSchema, orderDetailsSchema } = require("../validation/orders-validation.js");
const { getByUsernameSchema } = require("../validation/users-validation.js");
const { idSchema } = require("../validation/cart-validation.js");
const { validate } = require("../validation/validation.js");
const db = require("../utilities/database");
const Orders = require("../db/models/mongodb/orders");
const { ResponseError } = require("../error/response-error.js");
const { STATUS_ORDER } = require("../enum/status-order.js");
const Counters = require("../db/models/mongodb/counters/counters.js");

const createOrder = async (username, idCart, request) => {
    username = validate(getByUsernameSchema, username);
    idCart = validate(idSchema, idCart);
    const requestOrder = validate(createOrderSchema, request);

    const cart = await db.findOneByCondition({id: idCart, username: username}, "Carts", ["id", "productId", "username", "quantity", "totalPayment"]);
    if (cart === null) {
        throw new ResponseError(404, "Cart Not Found");
    }

    const product = await db.findByPrimaryKey(cart.productId, "Products", ["id", "productName", "price", "stock"]);
    if (product === null) {
        throw new ResponseError(404, "Product Not Found");
    }

    if (product.stock < requestOrder.quantity) {
        throw new ResponseError(400, "Stock not Enough");
    }

    let totalPriceWithShipCostAndDiscount = 0;
    if (requestOrder.discountVoucher !== null) {
        const vouchers = await db.findOneByCondition({voucherCode: requestOrder.discountVoucher}, "Vouchers", ["id", "voucherCode", "discountVoucher"]);
        if (!vouchers) {
            throw new ResponseError(404, "Voucher Not Found. Please enter correctly the voucher code.");
        }
        const totalWithShipCost = (product.price * requestOrder.quantity) + requestOrder.shipCost;
        const totalWithDiscount = (vouchers.discountVoucher / 100) * (product.price * requestOrder.quantity);
        totalPriceWithShipCostAndDiscount = totalWithShipCost - totalWithDiscount;
    } else {
        totalPriceWithShipCostAndDiscount = (product.price * requestOrder.quantity) + requestOrder.shipCost;
    }
    
    // const parameter = {
    //     payment_type: requestOrder.typePayment,
    //     bank_transfer: {
    //         bank: requestOrder.bankName
    //     },
    //     transaction_details: {
    //         order_id: generateOrderNumber(),
    //         gross_amount: totalPriceWithShipCostAndDiscount
    //     },
    //     custom_expiry: {
    //         order_time: "2023-10-04 15:57:10 +0700",
    //         expiry_duration: 60,
    //         unit: "minute"
    //     },
    //     quantity: requestOrder.quantity,
    //     username: cart.username,
    //     product: product.productName
    // }

    let orderCreate = new Orders({
        _id: await getNextSequenceNumber("ordersId"),
        orderNumber: generateOrderNumber(),
        orderDate: new Date().toISOString(),
        quantity: requestOrder.quantity,
        totalPrice: product.price * requestOrder.quantity,
        typePayment: requestOrder.typePayment,
        bankName: requestOrder.bankName,
        shipCost: requestOrder.shipCost,
        discountVoucher: requestOrder.discountVoucher,
        totalPayment: totalPriceWithShipCostAndDiscount,
        statusOrder: STATUS_ORDER.DELIVERY,
        isActive: 1,
        username: cart.username,
        productId: product.id
    });

    await orderCreate.save();

    if (requestOrder.quantity === cart.quantity) {
        await db.deleteData({id: cart.id}, "Carts");
    } else {
        const newQty = cart.quantity - requestOrder.quantity;
        const data = {
            quantity: newQty,
            totalPayment: newQty * product.price
        };
        await db.updateData({id: cart.id}, data, "Carts");
    }
    const payload = {
        stock: product.stock - requestOrder.quantity
    };
    await db.updateData({id: product.id}, payload, "Products");
    return orderCreate;
};

const getOrderDetails = async (payload) => {
    const request = validate(orderDetailsSchema, payload);
    
    const order = await Orders.findOne({
        username: request.username,
        orderNumber: request.orderNumber
    }).select("orderNumber orderDate quantity totalPrice typePayment shipCost totalPayment statusOrder");

    if (order === null) {
        throw new ResponseError(404, "Order not found");
    }

    return order;
};

const orderDone = async (id) => {
    id = validate(getIdOrderSchema, id);

    // const order = await db.findByPrimaryKey(id, "Orders", ["id", "orderNumber", "orderDate", "quantity", "total", "username", "productId", "statusOrder", "isActive"])
    let order = await Orders.findOne({
        _id: id
    });

    if (order === null) {
        throw new ResponseError(404, "Order Not Found");
    }

    if (order.statusOrder === "DONE") {
        throw new ResponseError(400, "Order Already Done");
    }

    let updateOrder = await Orders.updateOne({
        _id: id
    }, {
        $set: {
            statusOrder: STATUS_ORDER.DONE,
            isActive: 0
        }
    });

    updateOrder = await Orders.findOne({
        _id: id
    }).select("orderNumber orderDate quantity total statusOrder");
    return updateOrder;
    // await db.updateData({id: id}, payload, "Orders");
};

const getAllOrders = async () => {
    const allOrders = await Orders.find({});
    return allOrders;
};

const generateOrderNumber = () => {
    const date = new Date().getTime().toString();
    const result = `ORDER - ${date}`;
    return result;
};

const getNextSequenceNumber = async (sequenceName) => {
    let data = await Counters.findOneAndUpdate({
        _id: sequenceName
    }, {
        $inc: {
            sequence_value: 1
        }
    });

    data = await Counters.findOne({
        _id: sequenceName
    }).select("sequence_value");
    return data.sequence_value;
};

module.exports = {
    createOrder,
    orderDone,
    getAllOrders,
    getOrderDetails
};