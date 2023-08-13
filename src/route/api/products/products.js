const express = require("express");
const controller = require("../../../controller")
const productController = controller.productController;

const productRouter = express.Router();
productRouter.route("/")
        .post(productController.create)
        .get(productController.getAllProduct)
productRouter.route("/:id")
        .get(productController.getProductById)
        .put(productController.update)

module.exports = () => productRouter