const { Router } = require('express');
const { getAllOrders, updateOrderStatus } = require('../controllers/orders.controller');
const authenticate = require('../middlewares/auth.middleware');

const router = Router();

/**
 * Admin routes for orders
 */
router.get('/orders', authenticate, getAllOrders);
router.put('/orders/:id/status', authenticate, updateOrderStatus);

module.exports = router;
