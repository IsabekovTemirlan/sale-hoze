import express from "express";
import mongoose from "mongoose";
import AdMessage from "../models/adMessage.js";
import User from "../models/User.js";

const router = express.Router();

export const getAds = async (req, res) => {
  try {
    const AdMessages = await AdMessage.find().lean();
    await res.status(200).json(AdMessages)
  } catch (error) {
    await res.status(404).json({ message: error.message });
  }
}

export const likeAd = async (req, res) => {
  const { id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No ads with id: ${id}`);
    const ad = await AdMessage.findById(id);
    const updatedAd = await AdMessage.findByIdAndUpdate(id, { likeCount: ad.likeCount + 1 }, { new: true });
    res.json(updatedAd);

  } catch (error) {
    res.json({ message: error });
  }
}


export const createAd = async (req, res) => {
  const data = await req.body;
  const newAd = new AdMessage(data);

  try {
    await newAd.save();
    await User.findByIdAndUpdate(data.creator, { $push: { links: newAd._id } }).exec();
    await res.status(201).json({ newAd, message: 'Объявление успешно создано!' });

  } catch (e) {
    await res.status(409).json({ message: e.message })
  }
}

export const deleteAd = async (req, res) => {
  const { id } = req.params;
  const { userId } = await req.body;
  let newLinks;

  if (userId) {
    const user = await User.findById(userId);
    newLinks = user.links.filter(l=> l != id);
  }

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
    await AdMessage.findByIdAndRemove(id);
    await User.findByIdAndUpdate(userId, { links: newLinks }, { new: true });
    res.json({ message: "Объявление успешно удалено!" });

  } catch (e) { res.json({ message: e });}
}

export const updateAd = async (req, res) => {
  const { id } = req.params;
  const { title, description, location, killDate, price, creator, category, createdAt, likeCount, contactNumber, timeOut, photo, photoName } = req.body;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
    const updatedAd = { title, description, location, killDate, price, creator, category, createdAt, likeCount, contactNumber, timeOut, photo, photoName, _id: id };
    await AdMessage.findByIdAndUpdate(id, updatedAd, { new: true });
    res.json(updatedAd); 
     
  } catch (error) {
    res.json({message: error});
  }
  
}

export default router;