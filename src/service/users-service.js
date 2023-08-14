const { getByUsernameSchema, updateUsersSchema } = require("../validation/users-validation.js")
const { validate } = require("../validation/validation.js")
const { Users } = require("../models");
const { ResponseError } = require("../error/response-error.js");
const bcrypt = require("bcrypt");

const getByUsername = async (username) => {
    username = validate(getByUsernameSchema, username);

    const users = await Users.findOne({
        where: {
            username: username
        },
        attributes: ["username", "createdAt", "updatedAt"],
        include: ["contacts", "orders"]
    });
    if (users == null) {
        throw new ResponseError(404, "Users Not Found");
    }

    return users;
}

const getAllUser = async () => {
    const user = await Users.findAll({
        order: [["username", "asc"]],
        attributes: ["username", "createdAt", "updatedAt"],
        include: ["contacts"]
    });
    return user;
}

const updateUser = async (username, request) => {
    username = validate(getByUsernameSchema, username);
    const validRequest = validate(updateUsersSchema, request);

    const users = await Users.findByPk(username);
    if (users === null) {
        throw new ResponseError(404, "Users Not Found");
    }

    // if (users.username !== validRequest.username) {
    //     const isUsernameExists = await Users.findOne({
    //         where: {
    //             username: validRequest.username
    //         }
    //     });
    //     if (isUsernameExists) {
    //         throw new ResponseError(400, "Username already exists");
    //     }
    // }

    validRequest.password = await bcrypt.hash(validRequest.password, 10);
    users.password = validRequest.password;
    return await users.save();
}

const deleteUsers = async (username) => {
    username = validate(getByUsernameSchema, username);
    const users = await Users.findByPk(username);
    if (users === null) {
        throw new ResponseError(404, "Users Not Found");
    }
    return await users.destroy();
}

module.exports = {
    getByUsername,
    getAllUser,
    updateUser,
    deleteUsers
}