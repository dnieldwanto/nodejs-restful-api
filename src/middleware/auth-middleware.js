const {Users} = require("../models")
const JWT = require("jsonwebtoken")

const authentication = async (req, res, next) => {
    try {
        const token = req.get("Authorization");
        if (token && token.startsWith("Bearer ")) {
            const jwtToken = token.split(" ")[1];
            JWT.verify(jwtToken, process.env.SECRET_KEY);
            const user = await Users.findOne({
                where: {
                    token: jwtToken
                },
                include: ["contacts"]
            });
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
}

module.exports = {
    authentication
}