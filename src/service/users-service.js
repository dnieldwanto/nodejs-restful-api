const { getByUsernameSchema, updateUsersSchema } = require("../validation/users-validation.js");
const { validate } = require("../validation/validation.js");
const db = require("../utilities/database");
const { ResponseError } = require("../error/response-error.js");
const bcrypt = require("bcrypt");

const getByUsername = async (username) => {
    username = validate(getByUsernameSchema, username);
    const users = await db.findOneByCondition({username: username}, "Users", ["username", "createdAt", "updatedAt"], ["contacts"]);
    if (users == null) {
        throw new ResponseError(404, "Users Not Found");
    }

    return users;
};

const getAllUser = async () => {
    const user = await db.findAllData({}, "Users", [["username", "asc"]], ["username", "createdAt", "updatedAt"], ["contacts"]);
    return user;
};

const updateUser = async (username, request) => {
    username = validate(getByUsernameSchema, username);
    const validRequest = validate(updateUsersSchema, request);

    const users = await db.findByPrimaryKey(username, "Users", ["username", "createdAt", "updatedAt"]);
    if (users === null) {
        throw new ResponseError(404, "Users Not Found");
    }

    validRequest.password = await bcrypt.hash(validRequest.password, 10);
    users.password = validRequest.password;
    await db.updateData({username: username}, {password: users.password}, "Users");
    const result = {
        username: users.username,
        createdAt: users.createdAt,
        updatedAt: users.updatedAt
    };
    return result;
};

const deleteUsers = async (username) => {
    username = validate(getByUsernameSchema, username);
    return await db.deleteData({username: username}, "Users");
};

module.exports = {
    getByUsername,
    getAllUser,
    updateUser,
    deleteUsers
};