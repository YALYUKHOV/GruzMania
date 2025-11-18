const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const File = sequelize.define('File', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    url: { type: DataTypes.STRING, allowNull: false }, 
    fileType: { type: DataTypes.STRING }, //'image/jpeg', 'application/pdf'
    fileName: { type: DataTypes.STRING }, 
});

module.exports = File;