const { elasticsearch } = require("../../core");
const { esClient } = elasticsearch;

const createIndex = (index) => {
    return esClient.indices.create({index});
};

const insertDoc = (index, _id, data) => {
    return esClient.index({
        index: index,
        id: _id,
        body: data
    });
};

const updateDoc = (index, _id, data) => {
    return esClient.update({
        index: index,
        id: _id,
        body: {
            doc: data
        }
    });
};

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
};

module.exports = {
    createIndex,
    searchInIndex,
    insertDoc,
    updateDoc
};