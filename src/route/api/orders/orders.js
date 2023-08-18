const express = require("express");
const response = require("../../../response");
const { genericResponse } = response.genericResponse
const middleware = require("../../../middleware")
const { authentication, checkRole, checkUserActive } = middleware.authMiddleware
const controller = require("../../../controller")
const orderController = controller.orderController;

const orderRouter = express.Router();
orderRouter.post("/users", authentication, checkUserActive, orderController.create, genericResponse)
orderRouter.put("/:id", authentication, checkUserActive, checkRole, orderController.done, genericResponse)

module.exports = () => orderRouter