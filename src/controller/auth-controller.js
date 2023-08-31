const authService = require("../service/auth-service.js")

const register = async (req, res, next) => {
    try {
        const result = await authService.registerUser(req.body);
        req.message = "Successfully register your account";
        req.data = result;
        next();
    } catch (e) {
        next(e);
    }
} 

const verification = async (req, res, next) => {
    try {
        await authService.verificationUser(req.body);
        req.message = "Verification Your Account Success";
        next();
    } catch (e) {
        next(e);
    }
}

const login = async (req, res, next) => {
    try {
        const result = await authService.loginUser(req.body);
        req.message = "Successfully Login";
        req.data = result;
        next();
    } catch (e) {
        next(e);
    }
}

const logout = async (req, res, next) => {
    try {
        const username = req.user.username;
        await authService.logoutUser(username);
        req.message = "Successfully Logout";
        req.data = {};
        next();
    } catch (e) {
        next(e);
    }
}

module.exports = {
    register,
    login,
    logout,
    verification
}