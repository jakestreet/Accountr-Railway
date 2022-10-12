// server/index.js
require('dotenv').config();
const cors = require("cors");
const path = require('path');

const express = require("express");
const bodyParser = require("body-parser");

const nodemailer = require('nodemailer');

const PORT = process.env.PORT || 3001;

const app = express();

app.use(cors());

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../client/build')));

const jsonParser = bodyParser.json();

const transporter = nodemailer.createTransport({
    port: 587,
    host: "smtp.sendgrid.net",
        auth: {
            user: "apikey",
            pass: process.env.SENDGRID_API_KEY,
        },
    secure: false,
})

app.post("/send-email", jsonParser, (req, res) => {
    const body = req.body;
    const mailData = {
        from: "teamjest4713@gmail.com",
        to: body.emailAddress,
        subject: body.subject,
        text: body.body,
    }

    transporter.sendMail(mailData, function (err, info) {
        if(err) {
            console.log(err);
            res.json(err);
        }

        else {
            console.log(info);
            body.message = "Email Sent!";
            res.json(body);
        }
     });
})
  
app.listen(PORT, () => {
console.log(`Server listening on ${PORT}`);
});