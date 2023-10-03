const express = require("express");
const cartRouter = require("./carts.js");
const router = express.Router();
router.use(cartRouter());

module.exports = () => router;