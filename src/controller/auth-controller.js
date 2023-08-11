const authService = require("../service/auth-service.js")

const register = async (req, res, next) => {
    try {
        const result = await authService.registerUser(req.body);
        res.json({
            status: 200,
            message: "Successfully register your account",
            data: result
        });
    } catch (e) {
        next(e);
    }
}

const login = async (req, res, next) => {
    try {
        const result = await authService.loginUser(req.body);
        res.json({
            status: 200,
            data: result
        });
    } catch (e) {
        next(e);
    }
}

const logout = async (req, res, next) => {
    try {
        const username = req.user.username;
        await authService.logoutUser(username);
        res.json({
            status: 200,
            message: "Successfully logout"
        });
    } catch (e) {
        next(e);
    }
}

module.exports = {
    register,
    login,
    logout
}