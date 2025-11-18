const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const UserRequest = sequelize.define('UserRequest', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    company: { type: DataTypes.STRING, allowNull: false },
    message: { type: DataTypes.STRING, allowNull: false },
    preferredDate: { type: DataTypes.DATE, allowNull: false },
    status: { type: DataTypes.STRING, defaultValue: 'pending' },
});

module.exports = UserRequest;