const express = require("express");
const response = require("../../../response");
const { genericResponse } = response.genericResponse;
const middleware = require("../../../middleware");
const { authentication, checkUserActive } = middleware.authMiddleware;
const controller = require("../../../controller");
const addressController = controller.addressController;

const addressRouter = express.Router();
addressRouter.route("/contacts/")
        .get(authentication, checkUserActive, addressController.getAll, genericResponse)
        .post(authentication, checkUserActive, addressController.create, genericResponse);
addressRouter.route("/:id/contacts/")
        .get(authentication, checkUserActive, addressController.get, genericResponse)
        .put(authentication, checkUserActive, addressController.update, genericResponse)
        .delete(authentication, checkUserActive, addressController.addressDelete, genericResponse);

module.exports = () => addressRouter;