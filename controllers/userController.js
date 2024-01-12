import userProfile from '../models/userProfile.js';
import asyncHandler from 'express-async-handler';

export const createProfile = asyncHandler(async (req, res) => {
  try {
    const { id, name, description, mbti, enneagram, variant, tritype, socionics, sloan, psyche, image } = req.body;
    
    const newProfile = new userProfile({
      id,
      name,
      description,
      mbti,
      variant,
      enneagram,
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
  
      // Add choices to the arrays in the target user's profile
      targetUser.mbti.push(...mbtiChoices);
      targetUser.enneagram.push(...enneagramChoices);
      targetUser.zodiac.push(...zodiacChoices);
  
      // Save the updated profile of the target user
      await targetUser.save();
  
      res.status(200).json({ message: 'Profile choices updated successfully for the target user' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });