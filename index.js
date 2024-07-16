const express = require('express');
const mysql = require('mysql2');
const mysql = require('mysql');

const cors = require('cors');
const nm = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();
const app = express();

app.use(express.json())
app.use(cors());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "demo",
    insecureAuth: true

})
app.get('/info', (req, res) => {
    const sql = `INSERT INTO faculty VALUES("ANIL", "IT");`;
    const show = `select * from faculty;`;
    db.query(show, (err, data) => {
        if (err)
        return res.send("error");
        return  res.send(data);
       
    })
})
app.listen(4000, () => {
    console.log("server started at port 4000");
    db.connect(() => {
        console.log("Connected!");
    })
})

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
    const { email, otp } = req.body;
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
