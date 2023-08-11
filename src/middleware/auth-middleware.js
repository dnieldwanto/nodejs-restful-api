const {Users} = require("../../models/")

const authentication = async (req, res, next) => {
    const token = req.get("Authorization");
    if (token && token.startsWith("Bearer ")) {
        const splitToken = token.split(" ")[1];
        const user = await Users.findOne({
            where: {
                token: splitToken
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
}

module.exports = {
    authentication
}