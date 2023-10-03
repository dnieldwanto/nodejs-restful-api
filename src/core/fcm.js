const FCM = require("fcm-notification")
const config = require("config")
const { serverKey } = config.get("development").fcm;
const fcm = new FCM(serverKey)
const token = "token"

const sendFCM = () => {
    const message = {
        data: {
            score: "8.50",
            time: "2:45"
        },
        notification: {
            title: "Title",
            body: "Body"
        },
        token: token
    }
    
    fcm.send(message, (err, res) => {
        if (err) {
            console.log("error found", err);
        } else {
            console.log(res);
        }
    })
}

module.exports = sendFCM;