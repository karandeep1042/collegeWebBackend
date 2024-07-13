
const express = require("express");
const router = express.Router();

const { sendEmail } = require("../routes/routers");
router.post("/sendEmail", sendEmail);
module.exports = router;

// const express = require("express");
// const router = new express.Router();
// const nodemailer = require("nodemailer");
// router.post("/", (req, res) => {
//     const {email} = req.body;
//     try {
//         const transporter = nodemailer.createTransport({
//             service: "gmail",
//             auth: {
//                 user: process.env.EMAIL,
//                 pass: process.env.PASSWORD
//             }
//         });
//         const mailServices = {
//             from: process.env.EMAIL,
//             to: email,
//             subject: "hello..........",
//             html: '<h1>hii nandiniiiiiiiii</h1>'
//         }
//         transporter.sendMail(mailServices, (error, info) => {
//             if (error) {
//                 console.log(error);
//             } else {
//                 console.log(info.response)
//                 res.status(201).json({ status: 401, error });
//             }
//         })
//     } catch (error) {
        
//     }

// })

// module.exports = router