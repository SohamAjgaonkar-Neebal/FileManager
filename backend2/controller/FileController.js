const fs = require('fs');
const path = require('path');
 const File = require('../Models/File');
//const {File, M, sequelize} = require('../index.js');
const uploadDirectory = path.join(__dirname,'../Documents');
    
const upload = async (req,res,next) =>
{

    try {
             const F=req.file;
            console.log(F);
        const { filename,originalname, mimetype, buffer } = req.file;
    
        // Save file information to the database
         //const savedFile = await sequelize.models.File.create({
          const savedFile = await File.create({
          filename: filename,
          contentType: mimetype,
         // data: buffer,
        });
    
        return res.status(200).json({ success: true, message: 'File uploaded successfully', file: savedFile });
      } catch (error) {
        console.error('Error uploading file:', error);
        return res.status(500).json({ success: false, message: 'Internal Server Error' });
      }
};

const list=(req,res,next)=>
{
    fs.readdir(uploadDirectory,(err,files)=>{
        if(err)
        {
            console.log(err);
            return res.status(500).send('Internal Server Error');

        }
        console.log("list API Called");
        
        res.json({files});

    });
};

const deleteFile= (req,res,next) =>
{
    const filename=req.params.filename;
    const filePath=path.join(uploadDirectory,filename);

     fs.unlink (filePath, (err)=>{
        if(err)
        {
            consolele.log(err);

            const error=new Error('Failed to delete file');
            error.status=500; // Internal Server Error

            return next(error);
        }
        // Delete everyone named "Jane"
        deleteFromDB(filename,res);
       // res.json({message: `File ${filename} deleted successfully. `});

    });
};

  const deleteFromDB = async (filename,res) =>
  {
    //filename=`'${filename}'`;
    try {
      const result=await File.destroy({
        where: {
         filename: filename
        }
     });
     console.log("Delete Querry response:- ",result);

 return res.status(200).json({ success: true, message: 'File Deleted successfully' });
} catch (error) {
 console.error('Error deleting file:', error);
 return res.status(500).json({ success: false, message: 'Internal Server Error' });
}
  };

 const download = (req, res, next) => {
    const filename = req.params.filename;
    const filePath = path.join(uploadDirectory, filename);
  
    // Stream the file for download
    const fileStream = fs.createReadStream(filePath);
  
    fileStream.on('error', (err) => {
      if (err.code === 'ENOENT') {
        // File not found
        console.error(err);
        res.status(404).send('File not found');
      } else {
        // Other errors
        console.error(err);
        res.status(500).send('Internal Server Error');
      }
    });
  
    res.setHeader('Content-Type', 'application/octet-stream');
   // res.setHeader('Content-Disposition', `attachment; filename=${filename}`);
   //Gives this error for big files:-ERR_RESPONSE_HEADERS_MULTIPLE_CONTENT_DISPOSITION
    fileStream.pipe(res);
  };

module.exports={
    upload,
    list,
    deleteFile,
    download
};