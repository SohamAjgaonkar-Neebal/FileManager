// File.js

const { DataTypes } = require('sequelize');
//const { sequelize } = require('../index'); // Change this line
const sequelize = require('../DB/db'); 

const File = sequelize.define('File', {
  filename: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  contentType: {
    type: DataTypes.STRING,
    allowNull: false,
  }
});

module.exports = File;
