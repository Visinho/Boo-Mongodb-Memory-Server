import express from 'express';
import { createComment, getAllComments, getCommentsByRecent, getCommentsByLikes } from '../controllers/userCommentController.js';

const router = express.Router();

router.post('/', createComment); // Create a comment
router.get('/', getAllComments); // Get all comments
router.get('/sort-by-recent', getCommentsByRecent); // Sort comments by recent date
router.get('/sort-by-like', getCommentsByLikes); // Sort comments by date

export default router;
