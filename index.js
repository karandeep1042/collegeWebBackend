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

let tp = nm.createTransport({
    host: process.env.SMTP_HOST,
    port: 587,
    secure: false,
    auth: {
        user: process.env.SMTP_MAIL,
        pass: process.env.SMTP_PASSWORD
    },
});

app.post('/verifycredential', (req, res) => {
    const { email, password } = req.body;
    const sql = `select femail,fpassword from faculty where fpassword=${password} AND femail='${email}' `

    try {
        db.query(sql, (err, data) => {
            if (err) {
                console.log(err);
            }
            else if (data.length != 0) {
                for (let i = 0; i < data.length; i++) {
                    if (email == data[i].femail && password == data[i].fpassword) {
                        // console.log(data[i].fpassword);
                        res.json({ msg: "success" });
                    }
                }
            } else {
                // console.log("data=" + data);
                res.json({ msg: "failed" })
            }
        })
    } catch (error) {
        console.log(error);
    };
})

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

app.post('/checkforfirsttime',(req,res)=>{
    const {email,password}= req.body;
    let query = `select * from faculty where femail ='${email}' AND fpassword=${password}`;
    db.query(query,(error,data)=>{
        if(error){
            console.log(error);
        }else{
            if(data[0].fdept==null|| data[0].fjoindate==null || data[0].fphoneno==null){
                    res.json({msg : "newuser"})
            }else{
                res.json({msg:"olduser"})
            }
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