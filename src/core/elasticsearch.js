const config = require("config");
const elastic = config.get("development").database.elastic;
const elasticsearch = require('elasticsearch');

let esClient = new elasticsearch.Client({
    // node: elastic.node
    host: elastic.node,
    requestTimeout: 100000,
    keepAlive: false
});

esClient.ping({
    requestTimeout: 30000
}, function (error) {
    if (error) {
      console.trace('elasticsearch cluster is down!');
    } else {
      console.log('All is well');
    }
})

module.exports = {
    esClient
}