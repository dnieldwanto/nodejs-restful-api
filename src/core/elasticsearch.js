const dotenv = require("dotenv");
const elasticsearch = require('elasticsearch');
dotenv.config();

let esClient = new elasticsearch.Client({
    host: process.env.ELASTIC_HOST
});

module.exports = {
    esClient
}