const { elasticsearch } = require("../../core");
const { esClient } = elasticsearch

const createIndex = (index) => {
    return esClient.indices.create({index});
}

const searchInIndex = (index, query, from, size, attributes, sortArray = []) => {
    return esClient.search({
        index,
        body: {
            _source: {
                includes: attributes
            },
            query: query,
            sort: sortArray
        },
        from,
        size
    });
}

module.exports = {
    createIndex,
    searchInIndex
}