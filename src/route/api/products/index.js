const express = require("express");
const router = express.Router();
const productsAPI = require("./products");
router.use(productsAPI());

module.exports = () => router;