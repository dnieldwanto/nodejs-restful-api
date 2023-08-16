const express = require("express");
const response = require("../../../response");
const { genericResponse } = response.genericResponse
const controller = require("../../../controller")
const productController = controller.productController;

const productRouter = express.Router();
productRouter.route("/")
        .post(productController.create, genericResponse)
        .get(productController.getAllProduct, genericResponse)
productRouter.route("/:id")
        .get(productController.getProductById, genericResponse)
        .put(productController.update, genericResponse)

module.exports = () => productRouter