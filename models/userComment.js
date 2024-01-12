import { Schema, model } from 'mongoose';

const commentSchema = new Schema({
  userId: { type: String, required: true },
  text: { type: String, required: true },
  likes: [{ type: String }],
});

const Comment = model('Comment', commentSchema);

export default Comment;
