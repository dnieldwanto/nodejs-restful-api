const express = require("express");
const router = express.Router();
const suppliersAPI = require("./suppliers");
router.use(suppliersAPI());

module.exports = () => router;