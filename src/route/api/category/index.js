const express = require("express");
const router = express.Router();
const categoryAPI = require("./category");
router.use(categoryAPI());

module.exports = () => router