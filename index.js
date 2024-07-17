const express = require('express');
const mysql = require('mysql2');
// const mysql = require('mysql');

const cors = require('cors');
const nm = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();
const app = express();

app.use(express.json())
app.use(cors());

const db = mysql.createConnection({
    host: "database-2.czk2g4e2s0tj.eu-north-1.rds.amazonaws.com",
    port: 3306,
    user: "adminroot",
    password: "adminroot",
    database: "radavfaculty",
    insecureAuth: true
})

app.get('/info', (req, res) => {
    const show = `select * from faculty;`;
    db.query(show, (err, data) => {
        if (err) {
            // return res.send("error");
            console.log(err.message);
        }
        else {
            console.log(data);
        }
    })
})

app.listen(4000, () => {
    console.log("server started at port 4000");
    db.connect((err) => {
        if (err) {
            console.log(err.message);
        } else {
            console.log("Connected!");
        }
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

app.get('/verifycredential', (req, res) => {
    const { email, password } = req.body;
    const sql = `select * from faculty where fpassword=${password}`
    let responsedata;
    db.query(sql, (err, data) => {
        if (err) {
            console.log(err.message);
        }
        else {
            res.send(data);
        }
    })
})

app.post('/sendmail', (req, res) => {
    const { email, otp, password } = req.body;
    console.log(password);
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