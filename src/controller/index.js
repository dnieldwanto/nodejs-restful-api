const authController = require("./auth-controller")
const userController = require("./user-controller");
const contactController = require("./contact-controller")
const addressController = require("./address-controller")
const categoryController = require("./category-controller")
const supplierController = require("./supplier-controller")
const productController = require("./products-controller")
const orderController = require("./orders-controller")
const cartController = require("./carts-controller")
const voucherController = require("./voucher-controller")

module.exports = {
    authController,
    userController,
    contactController,
    addressController,
    categoryController,
    supplierController,
    productController,
    orderController,
    cartController,
    voucherController
}