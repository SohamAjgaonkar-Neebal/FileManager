const fs = require('fs');
const path = require('path');


const uploadDirectory = path.join(__dirname,'../Documents');
    
const upload = async (req,res,next) =>
{
    const F=req.file;
    console.log(F);
    try {

        //Some Async task can be performed
        res.send('File Uploaded Successfully!');
    }
    catch (error)
    {
        console.log(error);
        console.log(error.message);
        next({status:500,message:error.message});
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
        
        res.json({files});

    });
};

const deleteFile= (req,res,next) =>
{
    const filename=req.params.filename;
    const filePath=path.join(uploadDirectory,filename);

    fs.unlink(filePath, (err)=>{
        if(err)
        {
            consolele.log(err);

            const error=new Error('Failed to delete file');
            error.status=500; // Internal Server Error

            return next(error);
        }
        res.json({message: `File ${filename} deleted successfully. `});

    });
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
    res.setHeader('Content-Disposition', `attachment; filename=${filename}`);
    fileStream.pipe(res);
  };

module.exports={
    upload,
    list,
    deleteFile,
    download
};