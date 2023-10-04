const db = require("../../../../core")
const mongoose = require("mongoose")
const Schema = mongoose.Schema

const OrderSchema = new Schema({
    _id: {
        type: Number,
        required: true
    },
    orderNumber: {
        type: String,
        required: true
    },
    orderDate: {
        type: Date,
        required: true,
        default: Date.now()
    },
    quantity: {
        type: Number,
        default: 0
    },
    totalPrice: {
        type: Number,
        default: 0
    },
    typePayment: {
        type: String,
        required: true
    },
    bankName: {
        type: String
    },
    shipCost: {
        type: Number,
        required: true
    },
    discountVoucher: {
        type: String
    },
    totalPayment: {
        type: Number,
        default: 0
    },
    statusOrder: {
        type: String
    },
    isActive: {
        type: Number,
        default: 1
    },
    username : {
        type: String,
        required: true
    },
    productId: {
        type: Number,
        required: true
    },
    response_midtrans: {
        type: String,
        required: true
    }
}, {
    versionKey: false
})

const Orders = mongoose.model("orders", OrderSchema)
module.exports = Orders