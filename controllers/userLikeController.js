import asyncHandler from 'express-async-handler';
import Like from '../models/userLike.js';
import userProfile from '../models/userProfile.js';
import userComment from '../models/userComment.js';

export const likeComment = asyncHandler(async (req, res) => {
    try {
      const { userId, commentId } = req.body;
  
      // Check if the user exists
      const user = await userProfile.findById(userId);
      if (!user) {
        return res.status(404).json({ error: `User with ID ${userId} not found` });
      }
  
      // Check if the comment exists
      const comment = await userComment.findById(commentId);
      if (!comment) {
        return res.status(404).json({ error: `Comment with ID ${commentId} not found` });
      }
  
      // Check if the user already liked the comment
      const existingLike = comment.likes.includes(userId);
  
      if (existingLike) {
        // User already liked the comment, so dislike it
        comment.likes = comment.likes.filter((likeUserId) => likeUserId !== userId);
      } else {
        // User didn't like the comment, so like it
        comment.likes.push(userId);
      }
  
      await comment.save();
  
      res.status(200).json(comment);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
