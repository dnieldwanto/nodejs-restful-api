const express = require("express");
const cartsRouter = express.Router();
const response = require("../../../response");
const { genericResponse } = response.genericResponse;
const middleware = require("../../../middleware");
const { authentication, checkUserActive } = middleware.authMiddleware;
const controller = require("../../../controller");
const cartController = controller.cartController;

cartsRouter.get("/", authentication, checkUserActive, cartController.getCartByUsername, genericResponse);
cartsRouter.post("/", authentication, checkUserActive, cartController.addToCarts, genericResponse);
cartsRouter.delete("/:id", authentication, checkUserActive, cartController.deleteCart, genericResponse);

module.exports = () => cartsRouter;