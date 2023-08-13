const express = require("express")
const controller = require("../../../controller")
const middleware = require("../../../middleware")
const errorMiddleware = middleware.errorMiddleware.errorMiddleware
const authController = controller.authController;

const authRouter = express.Router();
authRouter.post("/register", authController.register);
authRouter.post("/login", authController.login);
authRouter.use(errorMiddleware);

module.exports = () => authRouter