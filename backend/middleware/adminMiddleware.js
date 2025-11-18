module.exports = function (req, res, next) {
    
    try {
        if (req.user.role !== "ADMIN") {
            return res.status(403).json({ message: "Нет доступа" });
        }
        next();
    } catch(e) {
        res.status(401).json({ message: "Пользователь не авторизован (ошибка в роли)" });
    }
};