const userService = require("../service/users-service.js");

const getUserByUsername = async (req, res, next) => {
    try {
        const username = req.user.username;
        const result = await userService.getByUsername(username);
        req.data = result;
        next();
    } catch (e) {
        next(e);
    }
}

const getAllUsers = async (req, res, next) => {
    try {
        const result = await userService.getAllUser();
        req.data = result;
        next();
    } catch (e) {
        next(e);
    }
}

const userUpdate = async (req, res, next) => {
    try {
        const username = req.user.username;
        const result = await userService.updateUser(username, req.body);
        req.data = result;
        next();
    } catch (e) {
        next(e);
    }
}

const userDelete = async (req, res, next) => {
    try {
        const username = req.user.username;
        await userService.deleteUsers(username);
        req.message = "Successfully delete your account";
        next();
    } catch (e) {
        next(e);
    }
}

module.exports = {
    getUserByUsername,
    getAllUsers,
    userUpdate,
    userDelete
}