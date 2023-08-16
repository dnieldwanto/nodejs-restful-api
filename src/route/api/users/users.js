const express = require("express");
const response = require("../../../response")
const { genericResponse } = response.genericResponse
const controller = require("../../../controller")
const authController = controller.authController
const userController = controller.userController

const userRouter = express.Router();
userRouter.delete("/logout/", authController.logout, genericResponse);
userRouter.get("/all/", userController.getAllUsers, genericResponse);
userRouter.route("/current")
        .get(userController.getUserByUsername, genericResponse)
        .put(userController.userUpdate, genericResponse)
        .delete(userController.userDelete, genericResponse);

module.exports = () => userRouter
