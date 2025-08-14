const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
const swaggerJsDoc = require("swagger-jsdoc");
const { description, version } = require("../../package.json");

const option = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: description,
            version: version
        },
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    in: "header",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                    name: "Authorization"
                }
            }
        },
        security: [
            {
                bearerAuth: [],
            },
        ],
        servers: [
            {
                url: "http://localhost:3000/api",
                description: "Local Host",
                variables: {}
            }
        ],
    },

    apis: [
        "./src/route/**/*.js", 
        "./src/service/*.js", 
        "./src/controller/*.js", 
        "./src/db/**/*.js"
    ]
};

const openapiSpecification = swaggerJsDoc(option);

const options = {
    swaggerOptions: {
        url: "/api-docs/swagger.json"
    },
    explorer: true
};

const swaggerRoute = express.Router();
swaggerRoute.get("/swagger.json", (req, res) => res.json(swaggerDocument));
swaggerRoute.use("/", swaggerUi.serveFiles(null, options), swaggerUi.setup(openapiSpecification, options));

module.exports = () => swaggerRoute;


