import mongoose from "mongoose";

const adsSchema = mongoose.Schema({
  title: String,
  description: String,
  location: String,
  contactNumber: String,
  photo: String,
  killDate: String,
  price: String,
  likeCount: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: new Date()
  },
  creator: String,
  category: String
})

const AdMessage = mongoose.model('AdMessage', adsSchema);

export default AdMessage;