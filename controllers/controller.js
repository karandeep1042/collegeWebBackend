const expressAsyncHandler = require("express-async-handler");
const dotenv = require("dotenv");
const nodemailer = require("nodemailer");
dotenv.config();

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
        user: process.env.SMTP_MAIL,
        pass: process.env.SMTP_PASSWORD
    },
});
const sendEmail = expressAsyncHandler(async (req, res) => {
    const { email } = req.body;
    console.log(email);
    var mailoption = {
        from:process.env.SMTP_MAIL,
        to: email,
        message:email

    };
    transporter.sendMail(mailoption,function(error,info){
        if(error){
            console.log(error);
        }else{
            console.log("email sent successfully");
        }
    })
})
module.exports = { sendEmail };