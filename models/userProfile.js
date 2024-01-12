import { Schema, model } from 'mongoose';

const userProfileSchema = new Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String },
  mbti: { type: String},
  enneagram: { type: String},
  variant: { type: String},
  socionics: { type: String},
  sloan: { type: String},
  psyche: { type: String},
  image: { type: String}
});

const userProfile = model('Profile', userProfileSchema);

export default userProfile;
