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
            node: process.env.NODE_ELASTIC
        },
        mongo: {
            uri: process.env.MONGO_URI,
            options: {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            }
        }
    },
    mailVerification: {
        email: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
    },
    fcm: {
        serverKey: {
            type: process.env.FCM_TYPE,
            project_id: process.env.FCM_PROJECT_ID,
            private_key_id: process.env.FCM_PRIVATE_KEY_ID,
            private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQDFiMGx7v25lOmE\nTn50mTKydmCelhhXuVvOXlObNU4sy/+HPfIC/1RWC7wb7yqfwdSzhk+fZ4JsNg3n\nJ/BPvIw66p/PlhDdHNngIxcDkKt7gFsWV0JFene/QjdJbFOe5RGOE2ayQnc7VpDK\njweXxPKOqbDQRN6v1RNS43NVbiGnu8ud2sRXBNA4l4Og412aMkPD6KenL5TTD1sT\nAr8ZY65Lv3e2ARO9+GazKol2o92bifJ0y/LyHs679dsOw6gcvs7I97Gv9WUl6h74\nCbqshXql02BcMLLmSrqCwVOuXFKLAT8V/XoG8SuYTsCVQ45zxZ3w1zT71frlYp88\nC1sKhf1vAgMBAAECggEAGNA/iKL9Y1kV5mVX1DzEVg+xvmobX7WslyVZOkd9bPop\nPKtm4cKCLRbnR9kI0S2vkuedy+fcRcyafX2SXenQ8bu0XIa80pHDuridtPhw2iA7\nEPjgHcsvDKr8N/BwJqcex+qe/WiFAsKyiIdkDEgUsiAV0mu8T3kkJsbkn4gomSGw\n36gwvWDU9N4bSTOO0jgqBfqieJkW5BkD0RdUNSYcRRk3dYHKKD2S7j21q0CBCqh+\nBbhdtYGNkSrWrL5p9xtRisbBnz3l3bkDe97z6NeT07kGFr8BNAOseuUCKYlVAoCS\nQ9EX2mq5VG7UFekQbSth9BcP8zlbPZcoyMhiO7xzNQKBgQDycd2DGbJvVrx+VqVy\nJFZFiaL/2BdktGe4hpBexlsrUP69yD+qJ6bm0mW4C5PXiRs2luaGlXN6c60QmJpr\ns0TAYP1/Og+rTE17tAwlUD+XF4jXTXvSVcJpW4efpRvVNicrAO6COavaUurqYJeB\nnN6BROuZJ0TggKIhfGgLZawT8wKBgQDQlBUAA1M1J5o+C/IDWWge77q8B6QjFafH\nDWYBlxvPNJuccUj0ufqEmEdw0aDUc+8QAbT+ORZEWq5DTJErMxici1MSyf8g1k3J\naKO03gnCTfkhl38BJyKx0FfBi8tRQfVXcLQdbZHSeJ28xvG59e1fwzn8UCo44pYI\nfILsgV1blQKBgQDO4B52Kc06eDarT2Apf5wmBgYSbd+4TMBckmZKmNNeqORWKLM6\njE88kre9ThO/TPztneHjYU+CY4Z/rNfHota9mYV1tKN+NcPAFKhwhoNcd/aKUVGg\n7xDPOg0GSqrvSiAt78OVV4Su7SYLDJT7QlIS2C55Jyr8roaqMC/P2df1xQKBgQC/\nR+5yUppOVwFHAaFynN218Vgo9ED8w/FXxNvVfYTNY4uJzwJ/HMe4LgbmWfjKnX+S\nCF65/hSDnz3NDjzbh0J83fDTfFfy/1Xa7ZGkXzRH80YUHmEk54UT2OOB5fgRjxG2\nnO8xRbjDckYGR9SLHBQTDHDzCXmPLY02Pym6R3EceQKBgQCr9qsw54QKXewoD+Bu\nQswfvZycU/RoZBOo8dKywGAnosniasvDOo+NNApHq3sVSsmnpOVvE0BprwD/HxE/\numdYdRS6S1RsO9OC4zxy80Sbg6ZtZjyKrCWUmwsFuFCHJa7tsCh25ubRXatrdxSJ\nnpI0tOi8R7oDCh1UXPXqQBSmRQ==\n-----END PRIVATE KEY-----\n",
            client_email: process.env.FCM_CLIENT_EMAIL,
            client_id: process.env.FCM_CLIENT_ID,
            auth_uri: process.env.FCM_AUTH_URI,
            token_uri: process.env.FCM_TOKEN_URI,
            auth_provider_x509_cert_url: process.env.FCM_AUTH_PROVIDER,
            client_x509_cert_url: process.env.FCM_CLIENT_CERT_URL
        }
    }
};

module.exports = {
    development
}