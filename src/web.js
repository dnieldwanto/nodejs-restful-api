const express = require("express");
const cors = require("cors")
const helmet = require("helmet")
const route = require("./route");
const swaggerRoute = require("./swagger");
const middleware = require("./middleware");
const path = require("path");
const { errorMiddleware } = middleware.errorMiddleware

const web = express();

// enable cors support to accept cross origin request
web.use(cors({}))

// enable helmet js middleware to configure secure headers
web.use(helmet())

web.use("/image", express.static(path.join(__dirname.replace("\\src", ""), "images")));
web.use(express.json());
web.use(route());
web.use("/api-docs", swaggerRoute());
web.use(errorMiddleware);

module.exports = {
    web
}