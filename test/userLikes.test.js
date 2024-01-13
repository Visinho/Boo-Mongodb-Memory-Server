import request from 'supertest';
import app from '../app.js'; 
import { deleteMany, create } from '../models/userLike.js';
import { deleteMany as deleteProfiles, create as createProfile } from '../models/userProfile.js';
import { deleteMany as deleteComments, create as createComment } from '../models/userComment.js';

beforeEach(async () => {
  await deleteMany();
  await deleteProfiles();
  await deleteComments();
});

describe('Like Comment Endpoint', () => {
  it('should like a comment', async () => {
    const existingUser = await createProfile({
      name: 'Test User',
      description: 'This is a test user',
    });

    const existingComment = await createComment({
      userId: existingUser._id,
      text: 'This is a test comment.',
    });

    const response = await request(app)
      .post('/api/likeComment')
      .send({
        userId: existingUser._id,
        commentId: existingComment._id,
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('likes');
    expect(response.body.likes).toContain(existingUser._id);
  });

  it('should dislike a comment', async () => {
    const existingUser = await createProfile({
      name: 'Test User',
      description: 'This is a test user',
    });

    const existingComment = await createComment({
      userId: existingUser._id,
      text: 'This is a test comment.',
      likes: [existingUser._id],
    });

    const response = await request(app)
      .post('/api/likeComment')
      .send({
        userId: existingUser._id,
        commentId: existingComment._id,
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('likes');
    expect(response.body.likes).not.toContain(existingUser._id);
  });
});
