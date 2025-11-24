import express from 'express';
import { check } from 'express-validator';
import { getUsers, login, registerUser,deleteUser } from '../controller/auth.controller.js'
import adminLogin from '../controller/admin.controller.js';
import { adminAuth } from '../middleware/admin.middleware.js';

const router = express.Router();

router.post('/register', [
    check('username', 'Username is required').not().isEmpty(),
    check('email', 'Email is required').isEmail(),
    check('password', 'Password is required at least 8 word').isLength({ min: 8 })
], registerUser);
router.post('/login', [
    check('email', 'Email is required').isEmail(),
    check('password', 'Password is required at least 8 word').not().isEmpty(),
], login);
router.get('/', getUsers)
router.delete('/:id', adminAuth, deleteUser)

router.post('/admin',  adminLogin)
export default router;