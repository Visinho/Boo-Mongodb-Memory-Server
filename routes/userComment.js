import express from 'express';
import { createComment } from '../controllers/userCommentController.js';

const router = express.Router();

router.post('/', createComment); // Create a comment

export default router;
