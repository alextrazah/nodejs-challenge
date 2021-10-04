const nodemailer = require('nodemailer');



function sendEmail(message) {
    return new Promise((res, rej) => {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.GOOGLE_USER,
                pass: process.env.GOOGLE_PASSWORD
            }
        })

        transporter.sendMail(message, function(err, info) {
            if (err) {
                rej(err)
            } else {
                res(info)
            }
        })
    })
}

exports.sendtextmail = function(Email) {
    const message = {
        from: process.env.GOOGLE_USER,
        to: Email,
        subject: 'Fivepoints  - test message mailer',
        html: `

        <h1>fivepoints</h1>
    `
    }
    return sendEmail(message);
}


exports.sendhtmlmail = function(Email) {
    const message = {
        from: process.env.GOOGLE_USER,
        to: Email,
        subject: 'fivepoints - test-mail',
        html: `

        <h1>fivepoints</h1>
      <h3> Hello</h3>
      <p>Mail is working ?!</p>
      
    `
    }
    return sendEmail(message);
}






