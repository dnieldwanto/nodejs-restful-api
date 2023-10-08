const errorMiddleware = require("./error-middleware")
const authMiddleware = require("./auth-middleware")
const multer = require("./multer")

module.exports = {
    errorMiddleware,
    authMiddleware,
    multer
}