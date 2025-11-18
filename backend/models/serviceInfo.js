const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const ServiceInfo = sequelize.define('ServiceInfo', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    type: { type: DataTypes.STRING }, // Оставил поле 'type' на случай, если оно понадобится для типизации блоков
    title: { type: DataTypes.STRING, allowNull: false },
    content: { type: DataTypes.TEXT, allowNull: false },
    orderIndex: { type: DataTypes.INTEGER, defaultValue: 0 }, // Поле для сортировки блоков информации
});

module.exports = ServiceInfo;