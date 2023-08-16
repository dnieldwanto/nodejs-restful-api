const express = require("express");
const response = require("../../../response");
const { genericResponse } = response.genericResponse
const controller = require("../../../controller")
const contactController = controller.contactController;

const contactRouter = express.Router();
contactRouter.post("/users/", contactController.create, genericResponse);
contactRouter.put("/:id/users/", contactController.update, genericResponse);
contactRouter.route("/")
                .get(contactController.getById, genericResponse)
                .delete(contactController.deleteContact, genericResponse)

module.exports = () => contactRouter