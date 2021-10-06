const express = require('express');
const nodemailer = require('nodemailer');
var router = express.Router();
const fs = require('fs');
const path = require('path');
const ejs = require('ejs');

router.get('/mail-text', async(req, res)=>{
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: "mohamedaziz.sahnoun@esprit.tn",
            pass: "20791756"
    }});
    try{
   await transporter.sendMail({
        from: 'mohamedaziz.sahnoun@esprit.tn',
        to: "mohamedaziz.sahnoun@esprit.tn",
        subject: "Salut", 
        text: req.body.text
    });
    res.json({message : "done"})
}
catch(err){ console.log(err);
        res.status(500).json({message:"internal server err"});}
});

router.post('/mail-ejs', async(req, res)=>{
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: "mohamedaziz.sahnoun@esprit.tn",
            pass: "20791756"
        }});
    const template = fs.readFileSync(path.resolve('./views', 'sendmail.ejs'), {encoding: 'utf-8'});
    const html = ejs.render(template, {
        text: req.body.text
    })

    let info = await transporter.sendMail({
        from: 'mohamedaziz.sahnoun@esprit.tn', 
        to: "mohamedaziz.sahnoun@esprit.tn",
        subject: "test mailing via ejs",
        html: html,
    });
    // 4. send respone
    res.json({message : "done"})
});
router.post('/attachement-ejs', async(req, res)=>{
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: "mohamedaziz.sahnoun@esprit.tn",
            pass: "20791756"
        }});
      

    let info = await transporter.sendMail({
        from: 'mohamedaziz.sahnoun@esprit.tn', 
        to: "mohamedaziz.sahnoun@esprit.tn",
        subject: "test mailing via ejs",
        attachments: [{
            filename: "filename",
            path: 'C:/Users/aziz/Desktop/fivenode/fivenode/assets/edit.txt' 
        }]
    });
    // 4. send respone
    res.json({message : "done"})
});

module.exports = router;