import { Schema, model } from 'mongoose';

const likeSchema = new Schema({
  userId: { type: String, required: true },
  commentId: { type: String, required: true },
});

const Like = model('Like', likeSchema);

export default Like;
