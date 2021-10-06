const express = require('express');

const multer = require('multer');
const util = require("util");
const path = require("path");
const fs = require('fs');
const { execSync } = require("child_process");
const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        if (
            !fs.existsSync(
                path.join(__dirname, '../public/uploads')
            )
        ) {
            execSync(
                `mkdir "${path.join(
                    __dirname, '../public/uploads'
                )}"`
            );
        }
        cb(null, './public/uploads');
    },
    filename: function (req, file, cb) {
       // console.log(file);
        cb(null, Date.now() + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'|| file.mimetype === 'image/jpg') {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

const upload = multer({ storage: storage, fileFilter: fileFilter });




router.post('/uploadfile', upload.single('image'), async(req, res)=>{
    res.json({message: 'done'});
});

module.exports = router;