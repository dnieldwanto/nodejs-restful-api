const express = require("express");
const controller = require("../../../controller")
const authController = controller.authController
const userController = controller.userController

const userRouter = express.Router();
userRouter.delete("/logout/", authController.logout);
userRouter.get("/all/", userController.getAllUsers);
userRouter.route("/current")
        .get(userController.getUserByUsername)
        .put(userController.userUpdate)
        .delete(userController.userDelete);

module.exports = () => userRouter
