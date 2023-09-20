const express = require("express")
const response = require("../../../response");
const { genericResponse } = response.genericResponse
const middleware = require("../../../middleware")
const { authentication, checkRole } = middleware.authMiddleware
const controller = require("../../../controller")
const userController = controller.userController;
const categoryController = controller.categoryController;
const supplierController = controller.supplierController;
const productController = controller.productController;
const orderController = controller.orderController;

const adminRouter = express.Router();
adminRouter.get("/users/all", authentication, checkRole, userController.getAllUsers, genericResponse);
adminRouter.post("/categories", authentication, checkRole, categoryController.create, genericResponse);
adminRouter.put("/categories/:id", authentication, checkRole, categoryController.update, genericResponse);
adminRouter.delete("/categories/:id", authentication, checkRole, categoryController.categoryDelete, genericResponse);
adminRouter.post("/suppliers", authentication, checkRole, supplierController.create, genericResponse);
adminRouter.put("/suppliers/:id", authentication, checkRole, supplierController.update, genericResponse);
adminRouter.delete("/suppliers/:id", authentication, checkRole, supplierController.supplierDelete, genericResponse);
adminRouter.post("/products", authentication, checkRole, productController.create, genericResponse);
adminRouter.put("/products/:id", authentication, checkRole, productController.update, genericResponse);
adminRouter.put("/orders/:id", authentication, checkRole, orderController.done, genericResponse);
adminRouter.get("/orders/:id/", authentication, checkRole, orderController.allOrders, genericResponse);

module.exports = () => adminRouter;