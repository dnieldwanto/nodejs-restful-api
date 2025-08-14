const express = require("express");
const response = require("../../../response");
const { genericResponse } = response.genericResponse;
const middleware = require("../../../middleware");
const { authentication, checkUserActive } = middleware.authMiddleware;
const controller = require("../../../controller");
const contactController = controller.contactController;

const contactRouter = express.Router();
contactRouter.put("/:id/users/", authentication, checkUserActive, contactController.update, genericResponse);
contactRouter.route("/")
                .get(authentication, checkUserActive, contactController.getById, genericResponse)
                .delete(authentication, checkUserActive, contactController.deleteContact, genericResponse);

module.exports = () => contactRouter;