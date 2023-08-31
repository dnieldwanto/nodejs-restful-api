const express = require("express");
const response = require("../../../response");
const { genericResponse } = response.genericResponse
const middleware = require("../../../middleware")
const { authentication, checkUserActive } = middleware.authMiddleware
const controller = require("../../../controller")
const categoryController = controller.categoryController;

const categoryRouter = express.Router();
categoryRouter.route("/")
        .get(authentication, checkUserActive, categoryController.getAll, genericResponse)
categoryRouter.route("/:id")
        .get(authentication, checkUserActive, categoryController.getById, genericResponse)

module.exports = () => categoryRouter