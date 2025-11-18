const { Service, Category, ServiceInfo } = require('../models');

class ServiceController {

    async create(req, res) {
        try {
            const { name, shortDesc, price, unit, categoryId } = req.body;

            if (!name || !price || !unit || !categoryId) {
                return res.status(400).json({ message: 'Поля name, price, unit и categoryId обязательны' });
            }

            const category = await Category.findByPk(categoryId);
            if (!category) {
                return res.status(404).json({ message: 'Категория с таким ID не найдена' });
            }

            const service = await Service.create({ name, shortDesc, price, unit, categoryId });
            return res.status(201).json(service);
        } catch (e) {
            console.error(e);
            res.status(500).json({ message: 'Ошибка при создании услуги' });
        }
    }

    async getAll(req, res) {
        try {
            const services = await Service.findAll({
                include: { model: Category, attributes: ['id', 'name'] }
            });
            return res.json(services);
        } catch (e) {
            console.error(e);
            res.status(500).json({ message: 'Ошибка при получении услуг' });
        }
    }
    async getAllByCategory(req, res) {
        try {
            const { id } = req.params;
            const services = await Service.findAll({ where: { categoryId: id } });
            return res.json(services);
        } catch (e) {
             console.error(e);
            res.status(500).json({ message: 'Ошибка при получении услуг для категории' });
        }
    }

    async getOne(req, res) {
        try {
            const { id } = req.params;
            const service = await Service.findByPk(id, {
                include: [
                    { model: Category, attributes: ['id', 'name'] },
                    { model: ServiceInfo, order: [['orderIndex', 'ASC']] }
                ]
            });

            if (!service) {
                return res.status(404).json({ message: 'Услуга не найдена' });
            }
            return res.json(service);
        } catch (e) {
            console.error(e);
            res.status(500).json({ message: 'Ошибка при получении услуги' });
        }
    }

    async update(req, res) {
        try {
            const { id } = req.params;
            const body = req.body;

            const [updated] = await Service.update(body, { where: { id } });

            if (updated) {
                const updatedService = await Service.findByPk(id);
                return res.json(updatedService);
            }
            return res.status(404).json({ message: 'Услуга не найдена' });
        } catch (e) {
            console.error(e);
            res.status(500).json({ message: 'Ошибка при обновлении услуги' });
        }
    }

    async delete(req, res) {
        try {
            const { id } = req.params;
            const deleted = await Service.destroy({ where: { id } });

            if (deleted) {
                return res.status(200).json({ message: 'Услуга успешно удалена' });
            }
            return res.status(404).json({ message: 'Услуга не найдена' });
        } catch (e) {
            console.error(e);
            res.status(500).json({ message: 'Ошибка при удалении услуги' });
        }
    }

    async getAllInfoForService(req, res) {
        try {
            const { id } = req.params; 
            const infoBlocks = await ServiceInfo.findAll({ 
                where: { serviceId: id },
                order: [['orderIndex', 'ASC']]
            });
            return res.json(infoBlocks);
        } catch (e) {
            console.error(e);
            res.status(500).json({ message: 'Ошибка при получении доп. информации' });
        }
    }

    async createInfo(req, res) {
        try {
            const { id } = req.params;
            const { title, content, orderIndex } = req.body;

            if (!title || !content) {
                return res.status(400).json({ message: 'Поля title и content обязательны' });
            }

            const infoBlock = await ServiceInfo.create({
                title,
                content,
                orderIndex,
                serviceId: id
            });

            return res.status(201).json(infoBlock);
        } catch (e) {
            console.error(e);
            res.status(500).json({ message: 'Ошибка при создании доп. информации' });
        }
    }

    async deleteInfo(req, res) {
        try {
            const { infoId } = req.params;
            const deleted = await ServiceInfo.destroy({ where: { id: infoId } });

            if (deleted) {
                return res.status(200).json({ message: 'Блок информации удален' });
            }
            return res.status(404).json({ message: 'Блок информации не найден' });
        } catch (e) {
            console.error(e);
            res.status(500).json({ message: 'Ошибка при удалении доп. информации' });
        }
    }
}

module.exports = new ServiceController();