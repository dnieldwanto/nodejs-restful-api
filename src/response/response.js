const {utils} = require("../core");

const genericResponse = async (req, res) => {
    if (!req.dummy) {
        const data = await utils.responseGenerator(req);
        res.send(data);
        res.end();
    } else {
        req.data [
            {
                dummy: "dummy response object"
            }
        ];
        const data = await utils.responseGenerator(req);
        res.send(data);
        res.end();
    }
};

module.exports = {
    genericResponse
};