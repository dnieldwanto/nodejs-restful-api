const express = require("express");
const router = express.Router();
const ordersAPI = require("./orders");
router.use(ordersAPI());

module.exports = () => router;