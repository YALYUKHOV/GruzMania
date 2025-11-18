const Router = require('express');
const router = new Router();
const categoryController = require('../controllers/categoryController');
const serviceController = require('../controllers/serviceController');
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');

router.post('/', authMiddleware, adminMiddleware, categoryController.create);
router.get('/', categoryController.getAll);
router.put('/:id', authMiddleware, adminMiddleware, categoryController.update);
router.delete('/:id', authMiddleware, adminMiddleware, categoryController.delete);
router.get('/:id/services', serviceController.getAllByCategory);

module.exports = router;