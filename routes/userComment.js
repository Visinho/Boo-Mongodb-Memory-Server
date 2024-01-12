import express from 'express';
import { createComment, getAllComments, getCommentsBySort } from '../controllers/userCommentController.js';

const router = express.Router();

router.post('/', createComment); // Create a comment
router.get('/', getAllComments); // Get all comments
router.get('/sort', getCommentsBySort); // Sort comments by date

export default router;
