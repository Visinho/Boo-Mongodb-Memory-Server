import userProfile from '../models/userProfile.js';
import asyncHandler from 'express-async-handler';

export const createProfile = asyncHandler(async (req, res) => {
  try {
    const { name, description, mbti, zodiac, enneagram, variant, tritype, socionics, sloan, psyche, image } = req.body;

    const newProfile = new userProfile({
      name,
      description,
      mbti: Array.isArray(mbti) ? mbti : [mbti],
      zodiac: Array.isArray(zodiac) ? zodiac : [zodiac],
      enneagram: Array.isArray(enneagram) ? enneagram : [enneagram],
      variant,
      tritype,
      socionics,
      sloan,
      psyche,
      image
    });

    const savedProfile = await newProfile.save();

    res.status(201).json(savedProfile);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


export const getProfile = asyncHandler(async (req, res) => {
    try {
      const profileId = req.params.id; 
  
      // Use the userProfile model to find the profile by ID
      const foundProfile = await userProfile.findById(profileId);
  
      if (!foundProfile) {
        return res.status(404).json({ error: `Profile with ID ${profileId} not found` });
      }
  
      res.status(200).json(foundProfile);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  export const updateUserProfile = asyncHandler(async (req, res) => {
    try {
      const { targetUserId, userId } = req.params;
      const { mbtiChoices, enneagramChoices, zodiacChoices } = req.body;
  
      // Find the user whose profile is being updated (current user)
      const currentUser = await userProfile.findById(userId);
  
      if (!currentUser) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      // Check if target user exists
      const targetUser = await userProfile.findById(targetUserId);
  
      if (!targetUser) {
        return res.status(404).json({ error: 'Target user not found' });
      }
  
      // Create a vote object to store choices with user information
      const vote = {
        userId: currentUser._id,
        mbti: mbtiChoices,
        enneagram: enneagramChoices,
        zodiac: zodiacChoices,
      };
  
      // Add vote to the arrays in the target user's profile
      targetUser.receivedVotes.push(vote);
  
      // Save the updated profile of the target user
      await targetUser.save();
  
      // If the current user is different from the target user, add choices to the arrays in the current user's profile
      if (userId !== targetUserId) {
        currentUser.ownVotes.push(vote);
  
        // Save the updated profile of the current user
        await currentUser.save();
      }
  
      const userVotesCount = currentUser.ownVotes.length;
      const targetUserReceivedVotesCount = targetUser.receivedVotes.length;
  
      res.status(200).json({
        message: 'Profile choices updated successfully',
        userVotesCount,
        targetUserReceivedVotesCount,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });