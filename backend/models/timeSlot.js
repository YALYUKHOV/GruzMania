const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const TimeSlot = sequelize.define('TimeSlot', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    startTime: { type: DataTypes.DATE, allowNull: false },
    endTime: { type: DataTypes.DATE, allowNull: false },
    status: { type: DataTypes.STRING, defaultValue: 'booked' }, //booked, completed, canceled
});

module.exports = TimeSlot;