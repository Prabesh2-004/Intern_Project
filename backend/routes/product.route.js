 import express from 'express';
import { adminAuth } from "../middleware/admin.middleware.js";
import { createProduct, getAllProduct, getProduct, deleteProduct } from '../controller/product.controller.js';
import upload from '../middleware/multer.js';

const router = express.Router();

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