const express = require("express");
const controller = require("../../../controller")
const orderController = controller.orderController;

const orderRouter = express.Router();
orderRouter.post("/users", orderController.create)
orderRouter.put("/:id", orderController.done)

module.exports = () => orderRouter