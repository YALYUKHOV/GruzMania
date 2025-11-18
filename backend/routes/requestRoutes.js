const Router = require('express');
const router = new Router();
const requestController = require('../controllers/requestController');
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');

//Создание заявки  требует авторизации
router.post('/', authMiddleware, requestController.create);

//Роуты только для админа
router.get('/', authMiddleware, adminMiddleware, requestController.getAll);
router.get('/:id', authMiddleware, adminMiddleware, requestController.getOne);
router.patch('/:id/status', authMiddleware, adminMiddleware, requestController.updateStatus);

module.exports = router;