const express = require("express");
const router = express.Router();
const addressAPI = require("./address");
router.use(addressAPI());

module.exports = () => router