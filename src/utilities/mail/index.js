const nodemailer = require("nodemailer");
const config = require("config");
const mail = config.get("development").mailVerification;

const sendEmailVerification = (email, otpCode) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: mail.email,
            pass: mail.pass
        }
    });
    
    const mailOptions = {
        from: mail.email,
        to: email,
        subject: "Account Verification",
        text: `Verification your account with code OTP : ${otpCode}`
    };

    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.error("Email error: " + err.message);
        } else {
            console.log("Email sent: " + info.response);
        }
    });
};

module.exports = {
    sendEmailVerification
};
