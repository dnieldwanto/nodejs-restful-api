const express = require("express");
const response = require("../../../response");
const { genericResponse } = response.genericResponse
const middleware = require("../../../middleware")
const { authentication, checkRole, checkUserActive } = middleware.authMiddleware
const controller = require("../../../controller")
const categoryController = controller.categoryController;

const categoryRouter = express.Router();
categoryRouter.route("/")
        .get(authentication, checkUserActive, categoryController.getAll, genericResponse)
        .post(authentication, checkUserActive, checkRole, categoryController.create, genericResponse)
categoryRouter.route("/:id")
        .get(authentication, checkUserActive, categoryController.getById, genericResponse)
        .put(authentication, checkUserActive, checkRole, categoryController.update, genericResponse)
        .delete(authentication, checkUserActive, checkRole, categoryController.categoryDelete, genericResponse)

module.exports = () => categoryRouter