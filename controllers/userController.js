import userProfile from '../models/userProfile.js';

export async function createProfile(req, res) {
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
}

export async function getProfile(req, res) {
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
  }
  