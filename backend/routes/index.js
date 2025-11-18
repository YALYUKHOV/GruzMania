const Router = require('express');
const router = new Router();

const authRoutes = require('./authRoutes');
const userRoutes = require('./userRoutes');
const categoryRoutes = require('./categoryRoutes');
const serviceRoutes = require('./serviceRoutes');
const orderRoutes = require('./orderRoutes');
const requestRoutes = require('./requestRoutes');
const fileRoutes = require('./fileRoutes');

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/categories', categoryRoutes);
router.use('/services', serviceRoutes);
router.use('/orders', orderRoutes);
router.use('/requests', requestRoutes);
router.use('/files', fileRoutes);

module.exports = router;