const { Order, OrderItem, Service, TimeSlot, User, File } = require('../models');
const sequelize = require('../config/db');

class OrderController {

    async create(req, res) {
        const t = await sequelize.transaction();

        try {
            const { address, description, orderType, items, timeSlots } = req.body;
            const userId = req.user.id;

            if (!items || items.length === 0) {
                await t.rollback();
                return res.status(400).json({ message: "Заказ должен содержать хотя бы одну услугу" });
            }

            const serviceIds = items.map(item => item.serviceId);
            const services = await Service.findAll({ where: { id: serviceIds } });

            const priceMap = services.reduce((acc, service) => {
                acc[service.id] = service.price;
                return acc;
            }, {});

            let totalPrice = 0;
            for (const item of items) {
                if (!priceMap[item.serviceId]) {
                    await t.rollback();
                    return res.status(404).json({ message: `Услуга с ID ${item.serviceId} не найдена` });
                }
                totalPrice += priceMap[item.serviceId] * item.quantity;
            }

            const order = await Order.create({
                userId,
                address,
                description,
                orderType,
                totalPrice,
            }, { transaction: t });

            const orderItems = items.map(item => ({
                orderId: order.id,
                serviceId: item.serviceId,
                quantity: item.quantity,
                price: priceMap[item.serviceId],
                total: priceMap[item.serviceId] * item.quantity,
            }));
            await OrderItem.bulkCreate(orderItems, { transaction: t });
            
            if (timeSlots && timeSlots.length > 0) {
                 const slotsToCreate = timeSlots.map(slot => ({
                     orderId: order.id,
                     startTime: slot.startTime,
                     endTime: slot.endTime,
                 }));
                 await TimeSlot.bulkCreate(slotsToCreate, { transaction: t });
            }

            await t.commit();

            const fullOrder = await Order.findByPk(order.id, {
                include: [{ model: OrderItem, include: [Service] }, { model: TimeSlot }]
            });

            return res.status(201).json(fullOrder);

        } catch (e) {
            await t.rollback();
            console.error(e);
            res.status(500).json({ message: "Ошибка при создании заказа" });
        }
    }

    async getAll(req, res) {
        try {
            const orders = await Order.findAll({
                order: [['createdAt', 'DESC']],
                include: [{ model: User, attributes: ['id', 'name', 'email'] }]
            });
            return res.json(orders);
        } catch (e) {
            res.status(500).json({ message: "Ошибка при получении заказов" });
        }
    }

    async getMyOrders(req, res) {
        try {
            const userId = req.user.id;
            const orders = await Order.findAll({
                where: { userId },
                order: [['createdAt', 'DESC']],
                include: [{ model: OrderItem, include: [Service] }, { model: TimeSlot }]
            });
            return res.json(orders);
        } catch (e) {
            res.status(500).json({ message: "Ошибка при получении заказов" });
        }
    }

    async getOne(req, res) {
        try {
            const { id } = req.params;
            const userId = req.user.id;
            const userRole = req.user.role;

            const order = await Order.findByPk(id, {
                include: [
                    { model: User, attributes: ['id', 'name', 'email'] },
                    { model: OrderItem, include: [{ model: Service, attributes: ['id', 'name'] }] },
                    { model: TimeSlot },
                    { model: File }
                ]
            });

            if (!order) {
                return res.status(404).json({ message: "Заказ не найден" });
            }
            
            if (order.userId !== userId && userRole !== 'ADMIN') {
                 return res.status(403).json({ message: "Нет доступа" });
            }

            return res.json(order);
        } catch (e) {
            res.status(500).json({ message: "Ошибка при получении заказа" });
        }
    }
    
    async updateStatus(req, res) {
        try {
            const { id } = req.params;
            const { status } = req.body;
            if (!status) {
                return res.status(400).json({ message: 'Статус не указан' });
            }
            
            const [updated] = await Order.update({ status }, { where: { id } });
            
            if (updated) {
                const updatedOrder = await Order.findByPk(id);
                return res.json(updatedOrder);
            }
            return res.status(404).json({ message: 'Заказ не найден' });

        } catch(e) {
            res.status(500).json({ message: 'Ошибка при обновлении статуса' });
        }
    }

    async cancel(req, res) {
        try {
            const { id } = req.params;
            const userId = req.user.id;

            const order = await Order.findByPk(id);
            if (!order) {
                return res.status(404).json({ message: "Заказ не найден" });
            }
            if (order.userId !== userId) {
                return res.status(403).json({ message: "Нет доступа" });
            }
            
            order.status = 'canceled';
            await order.save();
            
            return res.json(order);

        } catch(e) {
             res.status(500).json({ message: 'Ошибка при отмене заказа' });
        }
    }
}

module.exports = new OrderController();