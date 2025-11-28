 import express from 'express';
import { adminAuth } from "../middleware/admin.middleware.js";
import { createProduct, getAllProduct, getProduct, deleteProduct, getCartItem, addToCart, updateCart, removeProductCart, clearCart, syncLocalCart } from '../controller/product.controller.js';
import upload from '../middleware/multer.js';
import { protect } from '../middleware/auth.middleware.js';

const router = express.Router();

router.get('/cart', protect, getCartItem)
router.post('/cart/add', protect, addToCart)
router.post('/cart/update', protect, updateCart)
router.post('/cart/remove', protect, removeProductCart)
router.post('/cart/clear', protect,clearCart)
router.post('/cart/sync', protect, syncLocalCart)

router.post('/create', adminAuth, upload.fields([
    { name: 'image1', maxCount: 1 },
    { name: 'image2', maxCount: 1 },
    { name: 'image3', maxCount: 1 },
    { name: 'image4', maxCount: 1 },
  ]),express.urlencoded({ extended: true }), createProduct)
router.get('/', getAllProduct)
router.get('/:id', getProduct)
router.delete('/:id', adminAuth, deleteProduct)



export default router