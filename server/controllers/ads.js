import express from "express";
import mongoose from "mongoose";
import AdMessage from "../models/adMessage.js";

const router = express.Router();

// import ads from "../db/ads.js";

export const getAds = async (req, res) => {
  try {
    const AdMessages = await AdMessage.find().lean();
    await res.status(200).json(AdMessages);

    // await res.status(200).json(ads);

  } catch (error) {
    await res.status(404).json({message: error.message});
  }
}

export const likeAd = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No ads with id: ${id}`);

  const ad = await AdMessage.findById(id);

  const updatedAd = await AdMessage.findByIdAndUpdate(id, { likeCount: ad.likeCount + 1 }, { new: true });

  res.json(updatedAd);
}


export const createAd = async (req, res) => {
  const data = await req.body;
  const newAd = new AdMessage(data);

  try {
    await newAd.save();
    await res.status(201).json(newAd);

  } catch (e) {
    await res.status(409).json({message: e.message})
  }
}

export const deleteAd = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

  await AdMessage.findByIdAndRemove(id);

  res.json({ message: "Post deleted successfully." });
}

export default router;