// tests/profile.test.js
import request from 'supertest';
import app from '../app.js'; 
import { deleteMany, create } from '../models/userProfile.js';

beforeEach(async () => {
  await deleteMany();
});

describe('Profile Endpoints', () => {
  it('should create a new profile', async () => {
    const response = await request(app)
      .post('/api/createProfile')
      .send({
        name: 'Test User',
        description: 'This is a test user',
        mbti: 'INTJ',
        zodiac: 'Leo',
        enneagram: '5',
        variant: 'Self-preserving',
        tritype: '513',
        socionics: 'LIE',
        sloan: 'RCOAI',
        psyche: 'Commander',
        image: 'url-to-image',
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('_id');
  });

  it('should get a profile by ID', async () => {
    const existingProfile = await create({
      name: 'Test User',
      description: 'This is a test user',
      mbti: 'INTJ',
      zodiac: 'Leo',
      enneagram: '5',
      variant: 'Self-preserving',
      tritype: '513',
      socionics: 'LIE',
      sloan: 'RCOAI',
      psyche: 'Commander',
      image: 'url-to-image',
    });

    const response = await request(app).get(`/api/getProfile/${existingProfile._id}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('_id', existingProfile._id.toString());
  });

  it('should update a user profile', async () => {
    const currentUser = await create({
      name: 'Current User',
    });

    const targetUser = await create({
      name: 'Target User',
    });

    const response = await request(app)
      .put(`/api/updateUserProfile/${targetUser._id}/${currentUser._id}`)
      .send({
        mbtiChoices: 'INTP',
        enneagramChoices: '4',
        zodiacChoices: 'Gemini',
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message', 'Profile choices updated successfully');
    expect(response.body).toHaveProperty('userVotesCount');
    expect(response.body).toHaveProperty('targetUserReceivedVotesCount');
  });
});
