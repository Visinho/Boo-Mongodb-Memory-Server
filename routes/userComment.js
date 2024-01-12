import express from 'express';
import { createComment, getAllComments } from '../controllers/userCommentController.js';

const router = express.Router();

router.post('/', createComment); // Create a comment
router.get('/', getAllComments); // Get all comment

export default router;
