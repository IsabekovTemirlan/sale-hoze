import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const ImageShema = Schema({
  path: { type: String },
  name: { type: String }
})

const Image = model('Image', ImageShema);

export default Image;