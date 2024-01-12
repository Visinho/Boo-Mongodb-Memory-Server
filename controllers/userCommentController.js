import asyncHandler from 'express-async-handler';
import userComment from '../models/userComment.js';
import userProfile from '../models/userProfile.js';

export const createComment = asyncHandler(async (req, res) => {
  try {
    const { userId, text } = req.body;

    // Check if the user with the specified userId exists
    const existingUser = await userProfile.findById(userId);
    if (!existingUser) {
      return res.status(404).json({ error: `User with ID ${userId} not found` });
    }

    const newComment = new userComment({
      userId,
      text,
    });

    const savedComment = await newComment.save();

    res.status(201).json(savedComment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});