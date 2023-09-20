const mongoose = require("mongoose")
const config = require("config").get("development").database.mongo

mongoose.connection.on("connected", () => {
    console.log("Connected to DB");
})

mongoose.connection.on("error", (err) => {
    console.log(`Failed to Connect DB ${err}`);
})

exports.Connect = () => {
    mongoose.connect(config.uri, config.options)
    return mongoose.connection;
}