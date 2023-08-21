const { web } = require("./web.js");
const { socketConnection } = require("./utilities/socket")
const config = require("config")
const port = config.get("development").app.port;

const server = web.listen(port, () => {
    console.log(`Application running on port ${port}`);
});
socketConnection(server);