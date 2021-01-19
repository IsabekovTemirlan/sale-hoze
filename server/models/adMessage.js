import mongoose from "mongoose";

const { Schema, model, Types } = mongoose;

const adsSchema = Schema({
  title: String,
  description: String,
  location: String,
  contactNumber: String,
  photo: [Object],
  killDate: String,
  price: Number,
  createdAt: { type: Date, default: new Date() },
  timeOut: Number,
  creator: { type: Types.ObjectId, ref: "user" },
  category: String
});

const AdMessage = model('AdMessage', adsSchema);

export default AdMessage;