const express = require("express");
const { authentication } = require("../middleware/auth-middleware.js");
const userController = require("../controller/user-controller.js");
const authController = require("../controller/auth-controller.js");
const contactController = require("../controller/contact-controller.js");
const addressController = require("../controller/address-controller.js")
const categoryController = require("../controller/category-controller.js")
const supplierController = require("../controller/supplier-controller.js")
const orderController = require("../controller/orders-controller.js")
const productController = require("../controller/products-controller.js")

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

router.route("/categories")
        .get(categoryController.getAll)
        .post(categoryController.create)
router.route("/categories/:id")
        .get(categoryController.getById)
        .put(categoryController.update)
        .delete(categoryController.categoryDelete)

router.route("/suppliers")
        .get(supplierController.getAll)
        .post(supplierController.create)
router.route("/suppliers/:id")
        .get(supplierController.getById)
        .put(supplierController.update)
        .delete(supplierController.supplierDelete)

router.post("/orders/users", orderController.create)
router.put("/orders/:id", orderController.done)

router.route("/products")
        .post(productController.create)
        .get(productController.getAllProduct)
router.route("/products/:id")
        .get(productController.getProductById)
        .put(productController.update)

module.exports = {
    router
}