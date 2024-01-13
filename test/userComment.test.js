import request from 'supertest';
import app from '../app.js'; 
import { deleteMany, create } from '../models/userComment.js';
import { deleteMany as _deleteMany, create as _create } from '../models/userProfile.js';

beforeEach(async () => {
  await deleteMany();
  await _deleteMany();
});

describe('Comment Endpoints', () => {
  it('should create a new comment', async () => {
    const existingUser = await _create({
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

    const response = await request(app)
      .post('/api/createComment')
      .send({
        userId: existingUser._id,
        text: 'This is a test comment.',
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('_id');
  });

  it('should get all comments', async () => {
    const existingComments = await create([
      { userId: 'user1', text: 'Comment 1' },
      { userId: 'user2', text: 'Comment 2' },
    ]);

    const response = await request(app).get('/api/getAllComments');

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(existingComments.length);
  });

  it('should get comments sorted by recent', async () => {
    const existingComments = await create([
      { userId: 'user1', text: 'Comment 1' },
      { userId: 'user2', text: 'Comment 2' },
    ]);

    const response = await request(app).get('/api/getCommentsByRecent');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(expect.arrayContaining(existingComments.reverse()));
  });

  it('should get comments sorted by likes', async () => {
    const existingComments = await create([
      { userId: 'user1', text: 'Comment 1', likes: 10 },
      { userId: 'user2', text: 'Comment 2', likes: 5 },
    ]);

    const response = await request(app).get('/api/getCommentsByLikes');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(expect.arrayContaining(existingComments.sort((a, b) => b.likes - a.likes)));
  });

  it('should get comments by personality type', async () => {
    const existingUser1 = await _create({
      name: 'User 1',
      personalityType: 'INTJ',
    });

    const existingUser2 = await _create({
      name: 'User 2',
      personalityType: 'INFP',
    });

    const existingComments = await create([
      { userId: existingUser1._id, text: 'Comment 1' },
      { userId: existingUser2._id, text: 'Comment 2' },
    ]);

    const response = await request(app)
      .get('/api/getCommentsByPersonalityType')
      .query({ personalityType: 'personalityType', specificType: 'specificType' });

    expect(response.status).toBe(200);
  });
});
