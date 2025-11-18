const { UserRequest, User } = require('../models');

class RequestController {

    async create(req, res) {
        try {
            const { company, message, preferredDate } = req.body;
            const userId = req.user.id;

            if (!message) {
                return res.status(400).json({ message: 'Поле "сообщение" обязательно для заполнения' });
            }

            const request = await UserRequest.create({
                userId,
                company,
                message,
                preferredDate,
            });

            return res.status(201).json(request);
        } catch (e) {
            console.error(e);
            res.status(500).json({ message: 'Ошибка при создании заявки' });
        }
    }

    async getAll(req, res) {
        try {
            const requests = await UserRequest.findAll({
                order: [['createdAt', 'DESC']],
                // Подтягиваем информацию о пользователе, оставившем заявку
                include: { model: User, attributes: ['id', 'name', 'email'] }
            });
            return res.json(requests);
        } catch (e) {
            console.error(e);
            res.status(500).json({ message: 'Ошибка при получении заявок' });
        }
    }

    async getOne(req, res) {
        try {
            const { id } = req.params;
            const request = await UserRequest.findByPk(id, {
                include: { model: User, attributes: ['id', 'name', 'email'] }
            });

            if (!request) {
                return res.status(404).json({ message: 'Заявка не найдена' });
            }

            return res.json(request);
        } catch (e) {
            console.error(e);
            res.status(500).json({ message: 'Ошибка при получении заявки' });
        }
    }

    async updateStatus(req, res) {
        try {
            const { id } = req.params;
            const { status } = req.body;

            if (!status) {
                return res.status(400).json({ message: 'Статус не был предоставлен' });
            }

            const [updated] = await UserRequest.update({ status }, {
                where: { id }
            });

            if (updated) {
                const updatedRequest = await UserRequest.findByPk(id);
                return res.json(updatedRequest);
            }
            
            return res.status(404).json({ message: 'Заявка не найдена' });
        } catch (e) {
            console.error(e);
            res.status(500).json({ message: 'Ошибка при обновлении статуса' });
        }
    }
}

module.exports = new RequestController();