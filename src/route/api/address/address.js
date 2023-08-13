const express = require("express")
const controller = require("../../../controller")
const addressController = controller.addressController;

const addressRouter = express.Router();
addressRouter.route("/contacts/")
        .get(addressController.getAll)
        .post(addressController.create)
addressRouter.route("/:id/contacts/")
        .get(addressController.get)
        .put(addressController.update)
        .delete(addressController.addressDelete)

module.exports = () => addressRouter