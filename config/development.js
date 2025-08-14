const dotenv = require("dotenv");
dotenv.config();

const development = {
    app: {
        name: "NodeJS-RESTful-API",
        host: "http://localhost",
        port: 3000,
        jwtAlgo: process.env.JWT_ALGO,
        jwtExpired: process.env.JWT_EXPIRED,
        secretKey: process.env.SECRET_KEY
    },
    database: {
        postgres: {
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            host: process.env.DB_HOSTNAME,
            port: process.env.DB_PORT,
            dialect: process.env.DB_DIALECT,
            schema: process.env.DB_SCHEMA
        },
        elastic: {
            node: process.env.NODE_ELASTIC
        },
        mongo: {
            uri: process.env.MONGO_URI,
            options: {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            }
        }
    }
};

module.exports = {
    development
};