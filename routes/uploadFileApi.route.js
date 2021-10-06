const express = require('express');

const multer = require('multer');
const path = require("path");
const router = express.Router();

const storage = multer.diskStorage({
    destination:  (req, file, cb) =>{
        cb(null, './public/uploads');
    },
    filename:  (req, file, cb)=> {
       // console.log(file);
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const fileFilter = (req, file, cb) => {
    const alowedextentions = ['.png','.jpg','.gif','.jpeg' ]
    const fileExtention=  path.extname(file.originalname);
    cb(null, alowedextentions.includes(fileExtention));

    // if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'|| file.mimetype === 'image/jpg') {
    //     cb(null, true);
    // } else {
    //     cb(null, false);
    // }
}

const upload = multer({ storage: storage, fileFilter: fileFilter });




router.post('/upload-file', upload.single('image'), async(req, res)=>{
    res.json({message: 'done'});
});
router.post('/upload-file-Multi', upload.array('image', 5), async(req, res)=>{
    res.json({message: 'done'});
});

module.exports = router;