const db = require("../utilities/database");
const JWT = require("jsonwebtoken");

const authentication = async (req, res, next) => {
    try {
        const token = req.get("Authorization");
        if (token && token.startsWith("Bearer ")) {
            const jwtToken = token.split(" ")[1];
            JWT.verify(jwtToken, process.env.SECRET_KEY);
            const user = await db.findOneByCondition({token: jwtToken}, "Users", ["username", "roleId", "isActive"], ["contacts"]);
            if (!user) {
                res.json({
                    status: 401,
                    errors: "UNAUTHORIZED"
                }).end();
            } else {
                req.user = user;
                next();
            }
        } else {
            res.json({
                status: 401,
                errors: "UNAUTHORIZED"
            }).end();
        }
    } catch (error) {
        if (error instanceof JWT.TokenExpiredError) {
            res.json({
                status: 401,
                errors: "Session Timed Out. Please Login Again!"
            }).end();
        }
    }
};

const checkUserActive = async (req, res, next) => {
    const user = req.user;
    if (user.isActive === 1) {
        next();
    } else {
        res.json({
            status: 401,
            message: "Your account is not active. Verification Your Account First."
        }).end();
    }
};

const checkRole = async (req, res, next) => {
    const user = req.user;
    if (user.roleId === 1) {
        next();
    } else {
        res.json({
            status: 401,
            message: "You don't have permission"
        }).end();
    }
};

module.exports = {
    authentication,
    checkRole,
    checkUserActive
};