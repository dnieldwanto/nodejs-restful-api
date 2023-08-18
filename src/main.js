const { web } = require("./web.js");
const { socketConnection } = require("./utilities/socket")

const port = process.env.PORT || 3000
const server = web.listen(port, () => {
    console.log(`Application running on port ${port}`);
});
socketConnection(server);