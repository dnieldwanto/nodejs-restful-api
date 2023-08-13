const express = require("express");
const router = express.Router();
const userAPI = require("./users");
router.use(userAPI());

module.exports = () => router