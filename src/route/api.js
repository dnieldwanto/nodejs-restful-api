const express = require("express");
const { authentication } = require("../middleware/auth-middleware.js");
const userController = require("../controller/user-controller.js");
const authController = require("../controller/auth-controller.js");
const contactController = require("../controller/contact-controller.js");
const addressController = require("../controller/address-controller.js")

const router = express.Router();
router.use(authentication);
router.delete("/users/logout/", authController.logout);
router.get("/all/users/", userController.getAllUsers);
router.route("/users/current")
        .get(userController.getUserByUsername)
        .put(userController.userUpdate)
        .delete(userController.userDelete);

router.post("/contacts/users/", contactController.create);
router.put("/contacts/:id/users/", contactController.update);
router.get("/contacts/", contactController.getById);
router.delete("/contacts/:id", contactController.deleteContact);

router.route("/address/contacts/")
        .get(addressController.getAll)
        .post(addressController.create)
router.route("/address/:id/contacts/")
        .get(addressController.get)
        .put(addressController.update)
        .delete(addressController.addressDelete)

module.exports = {
    router
}