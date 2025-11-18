const { Category } = require('../models');

class CategoryController {

    async create(req, res) {
        try {
            const { name, description } = req.body;
            if (!name) {
                return res.status(400).json({ message: 'Название категории обязательно' });
            }

            const candidate = await Category.findOne({ where: { name } });
            if (candidate) {
                return res.status(400).json({ message: 'Категория с таким названием уже существует' });
            }

            const category = await Category.create({ name, description });
            return res.status(201).json(category);
        } catch (e) {
            console.error(e);
            res.status(500).json({ message: 'Ошибка при создании категории' });
        }
    }

    async getAll(req, res) {
        try {
            const categories = await Category.findAll();
            return res.json(categories);
        } catch (e) {
            console.error(e);
            res.status(500).json({ message: 'Ошибка при получении категорий' });
        }
    }

    async update(req, res) {
        try {
            const { id } = req.params;
            const { name, description } = req.body;

            const [updated] = await Category.update({ name, description }, {
                where: { id: id }
            });

            if (updated) {
                const updatedCategory = await Category.findOne({ where: { id: id } });
                return res.status(200).json(updatedCategory);
            }
            
            return res.status(404).json({ message: 'Категория не найдена' });
        } catch (e) {
            console.error(e);
            res.status(500).json({ message: 'Ошибка при обновлении категории' });
        }
    }

    async delete(req, res) {
        try {
            const { id } = req.params;
            const deleted = await Category.destroy({
                where: { id: id }
            });

            if (deleted) {
                return res.status(200).json({ message: 'Категория успешно удалена' });
            }
            return res.status(404).json({ message: 'Категория не найдена' });
        } catch (e) {
            console.error(e);
            res.status(500).json({ message: 'Ошибка при удалении категории' });
        }
    }
}

module.exports = new CategoryController();