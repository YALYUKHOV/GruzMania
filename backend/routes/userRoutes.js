const Router = require('express');
const router = new Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');

router.get('/', authMiddleware, adminMiddleware, userController.getAll);
router.get('/:id', authMiddleware, adminMiddleware, userController.getOne);
router.delete('/:id', authMiddleware, adminMiddleware, userController.delete);

module.exports = router;