//server/email.js
module.exports = function(app) {

    const bodyParser = require("body-parser");
    const nodemailer = require('nodemailer');
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
        console.log(body.name);
        const emailData = {
            from: 'Jake Street <teamjest4713@gmail.com>',
            to: body.emailAddress,
            subject: body.subject,
            text: body.body,
        }
    
        transporter.sendMail(emailData, function (err, info) {
            if(err) {
                console.log(err);
                body.message = "Email failed to send!";
                res.json(body);
            }
    
            else {
                console.log(info);
                body.message = "Email Sent!";
                res.json(body);
            }
         });
    })
}