import express from 'express';
import { Contact } from '../controller/contact.controller.js';

const router  = express.Router()

router.post('/', Contact);

export default router;