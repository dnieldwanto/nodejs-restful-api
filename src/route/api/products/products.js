const express = require("express");
const response = require("../../../response");
const { genericResponse } = response.genericResponse
const middleware = require("../../../middleware")
const { authentication, checkRole, checkUserActive } = middleware.authMiddleware
const controller = require("../../../controller")
const productController = controller.productController;

const productRouter = express.Router();
productRouter.get("/testing/", authentication, checkUserActive, productController.esTextSearch, genericResponse)
productRouter.route("/")
        .post(authentication, checkUserActive, checkRole, productController.create, genericResponse)
        .get(authentication, checkUserActive, productController.getAllProduct, genericResponse)
productRouter.route("/:id")
        .get(authentication, checkUserActive, productController.getProductById, genericResponse)
        .put(authentication, checkUserActive, checkRole, productController.update, genericResponse)

module.exports = () => productRouter