const Router = require('express');
const router = new Router();
const orderController = require('../controllers/orderController');
const fileController = require('../controllers/fileController');
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');
const uploadMiddleware = require('../middleware/uploadMiddleware');

// --- эндпоинты для авторизованных пользователей ---
router.post('/', authMiddleware, orderController.create);
router.get('/my', authMiddleware, orderController.getMyOrders);
router.get('/:id', authMiddleware, orderController.getOne);
router.delete('/:id', authMiddleware, orderController.cancel);
router.post('/:id/files', authMiddleware, uploadMiddleware.array('files', 5), fileController.upload);
router.get('/:id/files', authMiddleware, fileController.getFilesForOrder);

// --- эндпоинты' только для админа ---
router.get('/', authMiddleware, adminMiddleware, orderController.getAll);
router.patch('/:id/status', authMiddleware, adminMiddleware, orderController.updateStatus);


module.exports = router;