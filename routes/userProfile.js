import express from 'express';
import { createProfile, getProfile } from '../controllers/userController.js';

const router = express.Router();

router.post('/create', createProfile); //Create user profile
router.get('/:id', getProfile); //Get user profile




export default router;
