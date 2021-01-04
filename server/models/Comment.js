import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const CommentShema = Schema({
  owner: { type: String, required: true },
  author: { type: String, required: true},
  value: { type: String, required: true},
  date: { type: Date, default: new Date(), required: true},
  isToched: {
    type: Boolean,
    default: false,
    required: true
  }
})

const Role = model('Comment', CommentShema);

export default Role;