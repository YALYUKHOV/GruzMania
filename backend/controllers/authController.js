const { User } = require('../models'); 
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const generateJwt = (id, email, role) => {
    return jwt.sign(
        { id, email, role },
        process.env.JWT_SECRET,
        { expiresIn: '24h' } 
    );
};

class AuthController {
    async register(req, res) {
        try {
            const { name, email, password, phone } = req.body;

            if (!email || !password || !name || !phone) {
                return res.status(400).json({ message: 'Не все поля были предоставлены' });
            }

            const candidate = await User.findOne({ where: { email } });
            if (candidate) {
                return res.status(400).json({ message: 'Пользователь с таким email уже существует' });
            }

            const hashPassword = await bcrypt.hash(password, 5);

            const user = await User.create({
                name,
                email,
                phone,
                password: hashPassword,
            });

            const token = generateJwt(user.id, user.email, user.role);

            return res.status(201).json({ token });

        } catch (e) {
            console.error(e);
            res.status(500).json({ message: 'Ошибка при регистрации' });
        }
    }

    async login(req, res) {
        try {
            const { email, password } = req.body;

            const user = await User.findOne({ where: { email } });
            if (!user) {
                return res.status(404).json({ message: 'Пользователь с таким email не найден' });
            }

            let comparePassword = bcrypt.compareSync(password, user.password);
            if (!comparePassword) {
                return res.status(400).json({ message: 'Указан неверный пароль' });
            }

            const token = generateJwt(user.id, user.email, user.role);
            return res.json({ token });

        } catch (e) {
            console.error(e);
            res.status(500).json({ message: 'Ошибка при входе' });
        }
    }

    async check(req, res) {
        const token = generateJwt(req.user.id, req.user.email, req.user.role);
        return res.json({ token });
    }
}

module.exports = new AuthController();