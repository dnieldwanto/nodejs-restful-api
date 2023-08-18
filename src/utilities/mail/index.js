const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();

const sendEmailVerification = (email, otpCode) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.GMAIL_USER,
            pass: process.env.GMAIL_PASS
        }
    });
    
    const mailOptions = {
        from: process.env.GMAIL_USER,
        to: email,
        subject: "Account Verification",
        text: `Verification your account with code OTP : ${otpCode}`
    };

    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            next(err)
        } else {
            console.log("Email sent: " + info.response);
        }
    })
}

module.exports = {
    sendEmailVerification
}
