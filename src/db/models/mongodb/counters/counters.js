const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CountersSchema = new Schema({
    _id: {
        type: String,
        required: true
    },
    sequence_value: {
        type: Number,
        default: 0
    }
}, {
    versionKey: false
});

const Counters = mongoose.model("counter", CountersSchema);
module.exports = Counters;