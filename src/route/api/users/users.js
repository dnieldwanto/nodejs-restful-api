const express = require("express");
const response = require("../../../response")
const { genericResponse } = response.genericResponse
const controller = require("../../../controller")
const middleware = require("../../../middleware")
const { authentication, checkUserActive } = middleware.authMiddleware
const authController = controller.authController
const userController = controller.userController

const userRouter = express.Router();
userRouter.delete("/logout/", authentication, checkUserActive, authController.logout, genericResponse);
userRouter.get("/all/", authentication, checkUserActive, userController.getAllUsers, genericResponse);
userRouter.route("/current")
        .get(authentication, checkUserActive, userController.getUserByUsername, genericResponse)
        .put(authentication, checkUserActive, userController.userUpdate, genericResponse)
        .delete(authentication, checkUserActive, userController.userDelete, genericResponse);

module.exports = () => userRouter
