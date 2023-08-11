const express = require("express");
const { userRouter } = require("../route/noauth-api.js");
const { errorMiddleware } = require("../middleware/error-middleware.js");
const { router } = require("../route/api.js");

const web = express();
web.use(express.json());
web.use(userRouter);
web.use(router);
web.use(errorMiddleware);

module.exports = {
    web
}