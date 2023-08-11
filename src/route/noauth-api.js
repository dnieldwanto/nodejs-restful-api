const express = require("express")
const authController = require("../controller/auth-controller.js")

const userRouter = express.Router();
userRouter.post("/users/register", authController.register);
userRouter.post("/users/login", authController.login);

module.exports = {
    userRouter
}