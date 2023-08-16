const express = require("express")
const controller = require("../../../controller")
const response = require("../../../response");
const { genericResponse } = response.genericResponse
const authController = controller.authController;

const authRouter = express.Router();
authRouter.post("/register", authController.register, genericResponse);
authRouter.post("/login", authController.login, genericResponse);

module.exports = () => authRouter