const mongoose = require("mongoose")
const Schema = mongoose.Schema

const CountersSchema = new Schema({
    _id: {
        type: String,
        required: true
    },
    sequence_value: {
        type: Number,
        default: 0
    }
})

CountersSchema.pre("save", async function save(next) {
    try {
        return next()
    } catch (e) {
        return next(e)
    }
})

const Counters = mongoose.model("counters", CountersSchema)
module.exports = Counters