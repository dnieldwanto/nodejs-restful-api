const express = require("express");
const response = require("../../../response");
const { genericResponse } = response.genericResponse
const controller = require("../../../controller")
const categoryController = controller.categoryController;

const categoryRouter = express.Router();
categoryRouter.route("/")
        .get(categoryController.getAll, genericResponse)
        .post(categoryController.create, genericResponse)
categoryRouter.route("/:id")
        .get(categoryController.getById, genericResponse)
        .put(categoryController.update, genericResponse)
        .delete(categoryController.categoryDelete, genericResponse)

module.exports = () => categoryRouter