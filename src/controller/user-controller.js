const userService = require("../service/users-service.js");

const getUserByUsername = async (req, res, next) => {
    try {
        const username = req.user.username;
        const result = await userService.getByUsername(username);
        res.json({
            status: 200,
            data: result
        });
    } catch (e) {
        next(e);
    }
}

const getAllUsers = async (req, res, next) => {
    try {
        const result = await userService.getAllUser();
        res.json({
            status: 200,
            data: result
        })
    } catch (e) {
        next(e);
    }
}

const userUpdate = async (req, res, next) => {
    try {
        const username = req.user.username;
        const result = await userService.updateUser(username, req.body);
        res.json({
            status: 200,
            message: "Successfully update",
            data: result
        })
    } catch (e) {
        next(e);
    }
}

const userDelete = async (req, res, next) => {
    try {
        const username = req.user.username;
        await userService.deleteUsers(username);
        res.json({
            status: 200,
            message: "Successfully delete"
        });
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