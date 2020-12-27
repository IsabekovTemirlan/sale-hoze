import mongoose from "mongoose";

const adsSchema = mongoose.Schema({
  title: String,
  description: String,
  location: String,
  contactNumber: String,
  photo: [String],
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
  timeOut: Number,
  creator: String,
  category: String,
  photoName: [String],
  comments: [{
    text: String,
    author: String,
    date: {
      type: Date
    }
  }]
})

const AdMessage = mongoose.model('AdMessage', adsSchema);

export default AdMessage;