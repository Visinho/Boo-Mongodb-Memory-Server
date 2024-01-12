import express from 'express';
import { likeComment } from '../controllers/userLikeController.js';

const router = express.Router();

// POST like a comment
router.post('/', likeComment);

export default router;
