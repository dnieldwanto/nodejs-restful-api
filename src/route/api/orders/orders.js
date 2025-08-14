const express = require("express");
const response = require("../../../response");
const { genericResponse } = response.genericResponse;
const middleware = require("../../../middleware");
const { authentication, checkUserActive } = middleware.authMiddleware;
const controller = require("../../../controller");
const orderController = controller.orderController;

const orderRouter = express.Router();
orderRouter.post("/checkout/:id_cart", authentication, checkUserActive, orderController.create, genericResponse);
orderRouter.post("/details", authentication, orderController.orderDetails, genericResponse);

module.exports = () => orderRouter;