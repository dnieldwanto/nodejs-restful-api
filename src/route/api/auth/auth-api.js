const express = require("express")
const controller = require("../../../controller")
const response = require("../../../response");
const { genericResponse } = response.genericResponse
const authController = controller.authController;

const authRouter = express.Router();
authRouter.post("/admin/register", authController.registerAdmin, genericResponse);
authRouter.post("/register", authController.register, genericResponse);
authRouter.post("/login", authController.login, genericResponse);
authRouter.put("/verification", authController.verification, genericResponse);

module.exports = () => authRouter