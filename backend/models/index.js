const sequelize = require('../config/db');

const User = require('./user');
const UserRequest = require('./userRequest');
const Order = require('./order');
const Category = require('./category');
const Service = require('./service');
const ServiceInfo = require('./serviceInfo');
const OrderItem = require('./orderItem');
const TimeSlot = require('./timeSlot');
const File = require('./file');

User.hasMany(Order, { foreignKey: 'userId' });
Order.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(UserRequest, { foreignKey: 'userId' });
UserRequest.belongsTo(User, { foreignKey: 'userId' });

UserRequest.hasOne(Order, { foreignKey: 'userRequestId' });
Order.belongsTo(UserRequest, { foreignKey: 'userRequestId' });

Category.hasMany(Service, { foreignKey: 'categoryId' });
Service.belongsTo(Category, { foreignKey: 'categoryId' });

Service.hasMany(ServiceInfo, { foreignKey: 'serviceId' });
ServiceInfo.belongsTo(Service, { foreignKey: 'serviceId' });

Order.hasMany(OrderItem, { foreignKey: 'orderId' });
OrderItem.belongsTo(Order, { foreignKey: 'orderId' });

Service.hasMany(OrderItem, { foreignKey: 'serviceId' });
OrderItem.belongsTo(Service, { foreignKey: 'serviceId' });

Order.hasMany(TimeSlot, { foreignKey: 'orderId' });
TimeSlot.belongsTo(Order, { foreignKey: 'orderId' });

Order.hasMany(File, { foreignKey: 'orderId' });
File.belongsTo(Order, { foreignKey: 'orderId' });

module.exports = {
    sequelize,
    User,
    UserRequest,
    Order,
    Category,
    Service,
    ServiceInfo,
    OrderItem,
    TimeSlot,
    File,
};