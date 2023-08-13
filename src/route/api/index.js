const express = require("express");
const middleware = require("../../middleware")
const authRoute = require("./auth")
const usersRoute = require("./users")
const contactRoute = require("./contact")
const addressRoute = require("./address")
const categoryRoute = require("./category")
const supplierRoute = require("./suppliers")
const productsRoute = require("./products")
const ordersRoute = require("./orders")
const { authentication } = middleware.authMiddleware

const router = express.Router();
router.use("/auth", authRoute());
router.use("/users", authentication, usersRoute());
router.use("/contacts", authentication, contactRoute());
router.use("/address", authentication, addressRoute());
router.use("/categories", authentication, categoryRoute());
router.use("/suppliers", authentication, supplierRoute());
router.use("/products", authentication, productsRoute());
router.use("/orders", authentication, ordersRoute());

module.exports = () => router
