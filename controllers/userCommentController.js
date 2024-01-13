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

export const getAllComments = asyncHandler(async (req, res) => {
  try {
    // Fetch all comments
    const comments = await userComment.find();

    res.status(200).json(comments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export const getCommentsByRecent = asyncHandler(async (req, res) => {
  try {
    const sortBy = req.query.sortBy;

    let comments;

    if (sortBy === 'recent') {
      // Fetch comments sorted by the creation date in descending order (most recent first)
      comments = await userComment.find().sort({ createdAt: -1 });
    } else {
      // Fetch comments without sorting
      comments = await userComment.find();
    }

    res.status(200).json(comments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export const getCommentsByLikes = asyncHandler(async (req, res) => {
  try {
    const sortBy = req.query.sortBy;

    let comments;

    if (sortBy === 'likes') {
      // Fetch comments sorted by the number of likes in descending order
      comments = await userComment.find().sort({ likes: -1 });
    } else {
      // Fetch comments without sorting
      comments = await userComment.find();
    }

    res.status(200).json(comments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export const getCommentsByPersonalityType = asyncHandler(async (req, res) => {
  try {
    const { personalityType, specificType } = req.query;

    // Validate personalityType and specificType
    if (!personalityType || !specificType) {
      return res.status(400).json({ error: 'Invalid request parameters.' });
    }

    // Fetch users based on the selected personality type and specific type
    const users = await userProfile.find({ [personalityType]: specificType }, '_id');

    // Extract user IDs from the users array
    const userIds = users.map(user => user._id);

    // Fetch comments made by users with the specified personality type and specific type
    const comments = await userComment.find({ userId: { $in: userIds } });

    return res.json(comments);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error.' });
  }
});
