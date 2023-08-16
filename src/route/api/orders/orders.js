const express = require("express");
const response = require("../../../response");
const { genericResponse } = response.genericResponse
const controller = require("../../../controller")
const orderController = controller.orderController;

const orderRouter = express.Router();
orderRouter.post("/users", orderController.create, genericResponse)
orderRouter.put("/:id", orderController.done, genericResponse)

module.exports = () => orderRouter