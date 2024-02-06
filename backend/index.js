const express = require('express');
const cors = require('cors');

const bodyparser =require('body-parser');

const app = express();


// // cors
const corsOptions = {
    origin: ['http://127.0.0.1:4200', 'http://localhost:4200'],
    optionsSuccessStatus: 200
}
 app.use(cors(corsOptions));
//IF BACKEND AND FRONTEND ARE ON DIFFERENT SERVERS/PORTS THEN  CORS IS USED. ITS USED TO MAKE SERVER AWARE OF WEBSITES WHICH ARE ALLOWED TO INTERACT/ACCESS IT

const port = 3000;



// Routes
const FileRoutes = require('./routes/FileRoutes');


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