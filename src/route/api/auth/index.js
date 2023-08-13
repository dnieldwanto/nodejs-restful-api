const express = require("express");
const router = express.Router();
const authAPI = require("./auth-api");
router.use(authAPI());

module.exports = () => router