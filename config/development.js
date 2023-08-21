const dotenv = require("dotenv")
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
            dialect: process.env.DB_DIALECT
        },
        elastic: {
            cloudId: process.env.ELASTIC_CLOUD,
            cloudUsername: process.env.ELASTIC_USERNAME,
            cloudPassword: process.env.ELASTIC_PASSWORD
        }
    },
    mailVerification: {
        email: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
    }
};

module.exports = {
    development
}