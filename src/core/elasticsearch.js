const config = require("config");
const elastic = config.get("development").database.elastic;
const elasticsearch = require('@elastic/elasticsearch');

let esClient = new elasticsearch.Client({
    // cloud: {
    //     id: elastic.cloudId
    // },
    // auth: {
    //     username: elastic.cloudUsername,
    //     password: elastic.cloudPassword
    // }
    node: elastic.node
});

module.exports = {
    esClient
}