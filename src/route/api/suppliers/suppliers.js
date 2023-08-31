const express = require("express");
const response = require("../../../response");
const { genericResponse } = response.genericResponse
const middleware = require("../../../middleware")
const { authentication, checkUserActive } = middleware.authMiddleware
const controller = require("../../../controller")
const supplierController = controller.supplierController;

const supplierRouter = express.Router();
supplierRouter.route("/")
        .get(authentication, checkUserActive, supplierController.getAll, genericResponse)
supplierRouter.route("/:id")
        .get(authentication, checkUserActive, supplierController.getById, genericResponse)

module.exports = () => supplierRouter