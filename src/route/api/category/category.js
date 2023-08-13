const express = require("express");
const controller = require("../../../controller")
const categoryController = controller.categoryController;

const categoryRouter = express.Router();
categoryRouter.route("/")
        .get(categoryController.getAll)
        .post(categoryController.create)
categoryRouter.route("/:id")
        .get(categoryController.getById)
        .put(categoryController.update)
        .delete(categoryController.categoryDelete)

module.exports = () => categoryRouter