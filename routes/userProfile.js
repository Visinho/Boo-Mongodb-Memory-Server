import express from 'express';
import { createProfile, getProfile, updateUserProfile } from '../controllers/userController.js';

const router = express.Router();

router.post('/create', createProfile); //Create user profile
router.get('/:id', getProfile); //Get user profile
router.post('/updateProfile/:userId/:targetUserId', updateUserProfile); //Update user profile




export default router;
