const db = require("../utilities/database")
const { sendEmailVerification } = require("../utilities/mail");
const { ResponseError } = require("../error/response-error.js");
const { createUser, loginUserSchema } = require("../validation/auth-validation.js")
const { validate } = require("../validation/validation.js")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("config");
const app = config.get("development").app;
const { getByUsernameSchema } = require("../validation/users-validation.js");

const registerUser = async (request) => {
    const user = validate(createUser, request);

    const findUser = await db.findOneByCondition(
        {
            username: user.username
        }, 
        "Users", 
        ["username", "createdAt", "updatedAt"]
        );

    if (findUser) {
        throw new ResponseError(400, "Username already exists")
    }

    user.password = await bcrypt.hash(user.password, 10);
    const otp = generateOtpCode(4);
    const userCreate = await db.saveData({username: user.username, password: user.password, roleId: 2, otpCode: otp}, "Users");

    const contacts = await db.saveData({firstName: user.firstName, lastName: user.lastName, email: user.email, phone: null, username: userCreate.username}, "Contacts")
    sendEmailVerification(contacts.email, otp);
    return userCreate;
}

const registerAdmin = async (request) => {
    const admin = validate(createUser, request);

    const findAdmin = await db.findOneByCondition(
        {
            username: admin.username
        }, 
        "Users", 
        ["username", "createdAt", "updatedAt"]
        );

    if (findAdmin) {
        throw new ResponseError(400, "Username already exists")
    }

    admin.password = await bcrypt.hash(admin.password, 10);
    const adminCreate = await db.saveData({username: admin.username, password: admin.password, roleId: 1, isActive: 1}, "Users");

    await db.saveData({firstName: admin.firstName, lastName: admin.lastName, email: admin.email, phone: null, username: adminCreate.username}, "Contacts")
    return adminCreate;
}

const verificationUser = async (request) => {
    const user = await db.findOneByCondition(
        {
            username: request.username
        }, 
        "Users", 
        ["username", "createdAt", "updatedAt", "otpCode"]
        );

    if (!user) {
        throw new ResponseError(404, "User not found")
    }

    if (user.otpCode !== request.otpCode) {
        throw new ResponseError(400, "Invalid Code Verification")
    }
    return await db.updateData({username: request.username}, {isActive: 1}, "Users");
}

const loginUser = async (request) => {
    const validLogin = validate(loginUserSchema, request);

    const dataUser = await db.findOneByCondition({username: validLogin.username}, "Users", ["username", "password", "roleId", "createdAt", "updatedAt"])
    if (!dataUser) {
        throw new ResponseError(401, "Username atau password salah");
    }

    const isPasswordValid = await bcrypt.compare(validLogin.password, dataUser.password);
    if (!isPasswordValid) {
        throw new ResponseError(401, "Username atau password salah");
    }

    const token = jwt.sign({
        username: dataUser.username,
        roles: dataUser.roleId === 1 ? "Admin" : "Customer"
    }, app.secretKey, {
        algorithm: app.jwtAlgo,
        expiresIn: app.jwtExpired
    });

    dataUser.token = token;
    await db.updateData({ username: dataUser.username }, { token: dataUser.token }, "Users");

    const result = {
        type: "Bearer",
        token: token
    }

    return result;
}

const logoutUser = async (username) => {
    username = validate(getByUsernameSchema, username);
    const user = await db.findOneByCondition({username: username}, "Users", ["username", "createdAt", "updatedAt"])

    if (!user) {
        throw new ResponseError(404, "User Not Found");
    }

    user.token = null;
    return await db.updateData({username: user.username}, {token: user.token}, "Users");
}

const generateOtpCode = (length) => {
    const min = Math.pow(10, (length - 1));
    const max = Math.pow(10, (length));
    return Math.floor(Math.random() * (max - min) + min);
}

module.exports = {
    registerUser,
    registerAdmin,
    loginUser,
    logoutUser,
    verificationUser
}