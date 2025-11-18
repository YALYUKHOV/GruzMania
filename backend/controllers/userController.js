const { User } = require('../models');

class UserController {

    async getAll(req, res) {
        try {
            const users = await User.findAll({
                order: [['id', 'ASC']],
                attributes: { exclude: ['password'] }
            });
            return res.json(users);
        } catch (e) {
            console.error(e);
            res.status(500).json({ message: 'Ошибка при получении пользователей' });
        }
    }

    async getOne(req, res) {
        try {
            const { id } = req.params;
            const user = await User.findByPk(id, {
                // И здесь тоже исключаем пароль
                attributes: { exclude: ['password'] }
            });

            if (!user) {
                return res.status(404).json({ message: 'Пользователь не найден' });
            }

            return res.json(user);
        } catch (e) {
            console.error(e);
            res.status(500).json({ message: 'Ошибка при получении пользователя' });
        }
    }

    async delete(req, res) {
        try {
            const { id } = req.params;
            const deleted = await User.destroy({
                where: { id: id }
            });

            if (deleted) {
                return res.json({ message: 'Пользователь успешно удален' });
            }
            
            return res.status(404).json({ message: 'Пользователь не найден' });
        } catch (e) {
            console.error(e);
            res.status(500).json({ message: 'Ошибка при удалении пользователя' });
        }
    }
}

module.exports = new UserController();