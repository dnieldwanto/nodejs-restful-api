const express = require("express");
const controller = require("../../../controller")
const supplierController = controller.supplierController;

const supplierRouter = express.Router();
supplierRouter.route("/")
        .get(supplierController.getAll)
        .post(supplierController.create)
supplierRouter.route("/:id")
        .get(supplierController.getById)
        .put(supplierController.update)
        .delete(supplierController.supplierDelete)

module.exports = () => supplierRouter