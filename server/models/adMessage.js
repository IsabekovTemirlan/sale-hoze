import mongoose from "mongoose";

const adsSchema = mongoose.Schema({
  title: String,
  description: String,
  creator: String,
  selectedFiles: [String],
  likeCount: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: new Date()
  }
})

const AdMessage = mongoose.model('AdMessage', adsSchema);

export default AdMessage;