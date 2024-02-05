const express = require('express');
const cors = require('cors');
// const multer = require('multer');


const app = express();
app.use(express.json());

// // cors
const corsOptions = {
    origin: ['http://127.0.0.1:4200', 'http://localhost:4200'],
    optionsSuccessStatus: 200
}
 app.use(cors(corsOptions));
//IF BACKEND AND FRONTEND ARE ON DIFFERENT SERVERS/PORTS THEN  CORS IS USED. ITS USED TO MAKE SERVER AWARE OF WEBSITES WHICH ARE ALLOWED TO INTERACT/ACCESS IT

const port = 3000;

// const FileStorage = multer.diskStorage({
//     destination: (req,file,cb)=> {
//         cb(null,'Documents');
//     },
//     filename: (req,file,cb)=>{
//         cb(null,new Date().toISOString()+'-'+file.originalname);
//         //ensures file name ends with extension and is unique

//     }
// });

// app.use(multer({storage:FileStorage}).single('File'));

// Routes
const FileRoutes = require('./routes/FileRoutes');
// app.use('/',(req,res,next)=>{
//     console.log("I am here 1!");
//     next();
// });


// app.listen(port, () => {
//     console.log(`Server is running on port ${port}`);
//   });

  app.use('/',FileRoutes);

  // Default error-handling middleware
app.use((err, req, res, next) => {
    console.error(err);
  
    const statusCode = err.status || 500; // Default to Internal Server Error
    const message = err.message || 'Internal Server Error';
  
    res.status(statusCode).json({ error: message });
  });

  //starting the server
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });