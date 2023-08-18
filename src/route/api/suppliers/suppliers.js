const express = require("express");
const response = require("../../../response");
const { genericResponse } = response.genericResponse
const middleware = require("../../../middleware")
const { authentication, checkRole, checkUserActive } = middleware.authMiddleware
const controller = require("../../../controller")
const supplierController = controller.supplierController;

const supplierRouter = express.Router();
supplierRouter.route("/")
        .get(authentication, checkUserActive, supplierController.getAll, genericResponse)
        .post(authentication, checkUserActive, checkRole, supplierController.create, genericResponse)
supplierRouter.route("/:id")
        .get(authentication, checkUserActive, supplierController.getById, genericResponse)
        .put(authentication, checkUserActive, checkRole, supplierController.update, genericResponse)
        .delete(authentication, checkUserActive, checkRole, supplierController.supplierDelete, genericResponse)

module.exports = () => supplierRouter