const Router = require('express');
const router = new Router();
const fileController = require('../controllers/fileController');
const authMiddleware = require('../middleware/authMiddleware');

router.delete('/:id', authMiddleware, fileController.delete);

module.exports = router;