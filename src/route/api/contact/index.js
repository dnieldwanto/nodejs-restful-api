const express = require("express");
const router = express.Router();
const contactAPI = require("./contacts");
router.use(contactAPI());

module.exports = () => router