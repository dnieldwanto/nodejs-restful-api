const express = require("express");
const response = require("../../../response");
const { genericResponse } = response.genericResponse
const controller = require("../../../controller")
const supplierController = controller.supplierController;

const supplierRouter = express.Router();
supplierRouter.route("/")
        .get(supplierController.getAll, genericResponse)
        .post(supplierController.create, genericResponse)
supplierRouter.route("/:id")
        .get(supplierController.getById, genericResponse)
        .put(supplierController.update, genericResponse)
        .delete(supplierController.supplierDelete, genericResponse)

module.exports = () => supplierRouter