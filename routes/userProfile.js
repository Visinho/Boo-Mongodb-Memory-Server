import express from 'express';
import { createProfile } from '../controllers/userController.js';

const router = express.Router();

router.post('/create', createProfile); //Create user profile




export default router;
