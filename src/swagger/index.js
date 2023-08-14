const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
const swaggerJsDoc = require("swagger-jsdoc");
const { description, version } = require("../../package.json");

const option = {
    definition: {
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT"
                },
                apiKeyAuth: {
                    type: "apiKey",
                    in: "header",
                    name: "Authorization"
                }
            }
        },
        security: [
            {
                apiKeyAuth: []
            },
            {
                bearerAuth: []
            }
        ]
    },

    apis: ["./src/route/**/*.js", "./src/service/*.js", "./src/controller/*.js", "../../models/*.js"]
};

const openapiSpecification = swaggerJsDoc(option);

const options = {
    swaggerOptions: {
        url: "/api-docs/swagger.json"
    }
};

const swaggerRoute = express.Router();
swaggerRoute.get("/swagger.json", (req, res) => res.json(swaggerDocument))
swaggerRoute.use("/", swaggerUi.serveFiles(null, options), swaggerUi.setup(openapiSpecification, options));

module.exports = () => swaggerRoute


