import { Schema, model } from 'mongoose';

const userProfileSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  mbti: [{
    type: String,
  }],
  enneagram: [{
    type: String,
  }],
  zodiac: [{
    type: String,
  }],
  variant: { type: String },
  tritype: { type: Number },
  socionics: { type: String },
  sloan: { type: String },
  psyche: { type: String },
  image: { type: String },

  // Array to store votes made by the user
  ownVotes: [{
    mbti: [{
      type: String,
    }],
    enneagram: [{
      type: String,
    }],
    zodiac: [{
      type: String,
    }],
  }],

  // Array to store votes received by the user
  receivedVotes: [{
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'Profile', 
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
    mbti: [{
      type: String,
    }],
    enneagram: [{
      type: String,
    }],
    zodiac: [{
      type: String,
    }],
  }],
});

const userProfile = model('Profile', userProfileSchema);

export default userProfile;