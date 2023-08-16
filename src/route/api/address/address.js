const express = require("express")
const response = require("../../../response");
const { genericResponse } = response.genericResponse
const controller = require("../../../controller")
const addressController = controller.addressController;

const addressRouter = express.Router();
addressRouter.route("/contacts/")
        .get(addressController.getAll, genericResponse)
        .post(addressController.create, genericResponse)
addressRouter.route("/:id/contacts/")
        .get(addressController.get, genericResponse)
        .put(addressController.update, genericResponse)
        .delete(addressController.addressDelete, genericResponse)

module.exports = () => addressRouter