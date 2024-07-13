const express = require('express');
const app = express();
const cors = require('cors');
const nm = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();

app.use(express.json())
app.use(cors());

let tp = nm.createTransport({
    host: process.env.SMTP_HOST,
    port: 587,
    secure: false,
    auth: {
        user: process.env.SMTP_MAIL,
        pass: process.env.SMTP_PASSWORD
    },
});

app.post('/sendmail', (req, res) => {
    const {email,otp} = req.body;
    let mailOptions = {
        from: process.env.SMTP_MAIL,
        to: email,
        subject: 'Email OTP Testing',
        text: `Your OTP Is ${otp}`
    }

    tp.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log("Email Did not sent ", error);
        } else {
            console.log("Email Sent");
        }
    })
})

app.listen(process.env.PORT, () => {
    console.log("server started at port 8000");
})
// yaar hasa mt maa soyi nhi h