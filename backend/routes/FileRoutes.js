const express = require('express');
const FileController = require('../controller/FileController');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');

// Ensure the 'Documents' folder exists
const uploadDirectory = 'Documents';
if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory);
}



const FileStorage = multer.diskStorage({
    destination: (req,file,cb)=> {
        console.log("i am here 1");
        cb(null,'Documents');
    },
    filename: (req,file,cb)=>{
        cb(null,new Date().toISOString()+'-'+file.originalname);
        //ensures file name ends with extension and is unique

    }
});

router.post('/upload',multer({
    storage:FileStorage,
    limits: {
        fileSize: 50 * 1024 * 1024, // 10 MB 
      },
    }).single('File'),FileController.upload);

router.get('/list',FileController.list);

router.delete('/delete/:filename', FileController.deleteFile);

router.get('/download/:filename', FileController.download); 

module.exports=router;