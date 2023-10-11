const { web } = require("./web.js");
const { socketConnection } = require("./utilities/socket")
const config = require("config")
const port = config.get("development").app.port;
const { Connect } = require("./core/mongoose.js")

const server = web.listen(port, () => {
    Connect()
    console.log(`Application running on port ${port}`);
});
socketConnection(server);

console.log("testing");