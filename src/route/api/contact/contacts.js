const express = require("express");
const controller = require("../../../controller")
const contactController = controller.contactController;

const contactRouter = express.Router();
contactRouter.post("/users/", contactController.create);
contactRouter.put("/:id/users/", contactController.update);
contactRouter.route("/")
                .get(contactController.getById)
                .delete(contactController.deleteContact)

module.exports = () => contactRouter