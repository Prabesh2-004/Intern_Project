import express from 'express';
import {
  placeOrder,
  getAllOrders,
  updateOrderStatus,
  getUserOrders,
  cancelOrder,
} from '../controller/order.controller.js';
import { protect } from '../middleware/auth.middleware.js';
import { adminAuth } from '../middleware/admin.middleware.js';

const router = express.Router();

router.post('/place', protect, placeOrder);
router.get('/list', adminAuth, getAllOrders);
router.post('/status', adminAuth, updateOrderStatus);
router.get('/user-orders', protect, getUserOrders);
router.post('/cancel', protect, cancelOrder);

export default router;
