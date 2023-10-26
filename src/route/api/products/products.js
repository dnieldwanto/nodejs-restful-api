const express = require("express");
const response = require("../../../response");
const { genericResponse } = response.genericResponse
const middleware = require("../../../middleware")
const { authentication, checkUserActive } = middleware.authMiddleware
const controller = require("../../../controller")
const productController = controller.productController;

const productRouter = express.Router();
productRouter.get("/search", authentication, checkUserActive, productController.esTextSearch, genericResponse)
productRouter.get("/", authentication, checkUserActive, productController.getAllProduct, genericResponse)
productRouter.get("/:id", authentication, checkUserActive, productController.getProductById, genericResponse)

module.exports = () => productRouter