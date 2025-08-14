const _ = require("lodash");

const responseGenerator = (req) => {
    let response = {};
    if (!_.isEmpty(req)) {
        response.status = 200,
        response.data = req.data || null,
        response.message = req.message || "OK";
    }
    return response;
};

module.exports = {
    responseGenerator
};