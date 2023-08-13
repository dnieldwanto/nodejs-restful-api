const express = require("express");
const route = require("../route");
const middleware = require("../middleware")
const { errorMiddleware } = middleware.errorMiddleware

const web = express();
web.use(express.json());
web.use(route());
web.use(errorMiddleware);

module.exports = {
    web
}