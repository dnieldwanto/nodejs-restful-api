const socketIo = require("socket.io");

let io;
const socketConnection = (server) => {
    io = socketIo(server, {
        cors: {
            origin: "*"
        }
    });

    io.on("connection", (socket) => {
        console.log("User Connected");
    });
}

const sendMessage = (channel, message) => {
    io.emit(channel, message);
}

module.exports = {
    socketConnection,
    sendMessage
}