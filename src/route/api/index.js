const express = require("express");
const authRoute = require("./auth")
const usersRoute = require("./users")
const contactRoute = require("./contact")
const addressRoute = require("./address")
const categoryRoute = require("./category")
const supplierRoute = require("./suppliers")
const productsRoute = require("./products")
const ordersRoute = require("./orders")
const adminRoute = require("./admin");
const cartRoute = require("./carts")

const router = express.Router();
router.use("/auth", authRoute());
router.use("/users", usersRoute());
router.use("/contacts", contactRoute());
router.use("/address", addressRoute());
router.use("/categories", categoryRoute());
router.use("/suppliers", supplierRoute());
router.use("/products", productsRoute());
router.use("/orders", ordersRoute());
router.use("/admin", adminRoute());
router.use("/cart", cartRoute());

module.exports = () => router
