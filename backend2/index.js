const express = require('express');
const cors = require('cors');
//const { Sequelize ,DataTypes} = require('sequelize');
const sequelize = require('./DB/db');

// Routes
const FileRoutes = require('./routes/FileRoutes');

const app = express();


// // cors
const corsOptions = {
    origin: ['http://127.0.0.1:4200', 'http://localhost:4200'],
    optionsSuccessStatus: 200
}
 app.use(cors(corsOptions));
//IF BACKEND AND FRONTEND ARE ON DIFFERENT SERVERS/PORTS THEN  CORS IS USED. ITS USED TO MAKE SERVER AWARE OF WEBSITES WHICH ARE ALLOWED TO INTERACT/ACCESS IT

const PORT = 3000;
// parse requests of content-type - application/json
app.use(express.json());  /* bodyParser.json() is deprecated */

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));   /* bodyParser.urlencoded() is deprecated */

// const sequelize = new Sequelize('postgres', 'postgres', 'postgres', {
//   host: 'localhost',
//   dialect: 'postgres' 
// });

async function authenticateDatabase() {
  try {
      await sequelize.authenticate();
      console.log('Connection has been established successfully.');
  } catch (error) {
      console.error('Unable to connect to the database:', error);
  }
}
// const M=sequelize.models.File;

app.use('/',FileRoutes);
  
  // Default error-handling middleware
app.use((err, req, res, next) => 
{
    console.error(err);
  
    const statusCode = err.status || 500; // Default to Internal Server Error
    const message = err.message || 'Internal Server Error';
  
    res.status(statusCode).json({ error: message });
});


  async function startServer() {
    try {
        await sequelize.sync();
        await authenticateDatabase();
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Error syncing database:', error);
    }
}

startServer();

module.exports = {
  sequelize,
  File,
 // M
};



