const { development } = require("./development");
const dotenv = require("dotenv");
dotenv.config();

module.exports = {
    development: {
        ...development.database.postgres
    },
	test: {},
	production: {},
};