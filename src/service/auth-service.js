const {Users} = require("../models");
const { ResponseError } = require("../error/response-error.js");
const { createUser, loginUserSchema } = require("../validation/auth-validation.js")
const { validate } = require("../validation/validation.js")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const { getByUsernameSchema } = require("../validation/users-validation.js");
dotenv.config();

const registerUser = async (request) => {
    const user = validate(createUser, request);

    const findUser = await Users.findAll({ 
        where: { 
            username: user.username 
        }
    });

    if (findUser.length !== 0) {
        throw new ResponseError(400, "Username already exists")
    }

    user.password = await bcrypt.hash(user.password, 10);
    return await Users.create(user);
}

const loginUser = async (request) => {
    const validLogin = validate(loginUserSchema, request);
    const dataUser = await Users.findOne({
        where: {
            username: validLogin.username
        }
    });

    if (!dataUser) {
        throw new ResponseError(401, "Username atau password salah");
    }

    const isPasswordValid = await bcrypt.compare(validLogin.password, dataUser.password);
    if (!isPasswordValid) {
        throw new ResponseError(401, "Username atau password salah");
    }

    const token = jwt.sign({
        when: Date.now(),
        username: dataUser.username
    }, process.env.SECRET_KEY, {
        algorithm: process.env.JWT_ALGO,
        expiresIn: process.env.JWT_EXPIRED
    });

    dataUser.token = token;
    await dataUser.save();

    const result = {
        type: "Bearer",
        token: token
    }

    return result;
}

const logoutUser = async (username) => {
    username = validate(getByUsernameSchema, username);
    const user = await Users.findOne({
        where: {
            username: username
        }
    });

    if (!user) {
        throw new ResponseError(404, "User Not Found");
    }

    user.token = null;
    return await user.save();
}

module.exports = {
    registerUser,
    loginUser,
    logoutUser
}