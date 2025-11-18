const Router = require('express');
const router = new Router();
const serviceController = require('../controllers/serviceController');
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');

// --- Публичные эндпоинты ---
router.get('/', serviceController.getAll);
router.get('/:id', serviceController.getOne);
router.get('/:id/info', serviceController.getAllInfoForService);

// --- эндпоинты только для админа ---
router.post('/', authMiddleware, adminMiddleware, serviceController.create);
router.put('/:id', authMiddleware, adminMiddleware, serviceController.update);
router.delete('/:id', authMiddleware, adminMiddleware, serviceController.delete);
router.post('/:id/info', authMiddleware, adminMiddleware, serviceController.createInfo);
router.delete('/info/:infoId', authMiddleware, adminMiddleware, serviceController.deleteInfo);


module.exports = router;