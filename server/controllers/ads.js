import express from "express";
import mongoose from "mongoose";
import AdMessage from "../models/adMessage.js";
import User from "../models/User.js";
import Comment from "../models/Comment.js";

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
  const { adId, userId } = await req.body;

  try {

    await User.updateOne({ _id: userId }, { $push: { favorites: adId } });

    res.status(200).json("Объявление добавлено в избранное!")

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
  let newFavorites;

  if (userId) {
    const user = await User.findById(userId);
    newLinks = user.links.filter(l => l != id);
    newFavorites = user.favorites.filter(l => l != id);
  }

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
    await AdMessage.findByIdAndRemove(id);
    await User.findByIdAndUpdate(userId, { links: newLinks, favorites: newFavorites }, { new: true });
    await Comment.deleteMany({owner: id});
    res.json({ message: "Объявление успешно удалено!" });

  } catch (e) { res.json({ message: e }); }
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
    res.json({ message: error });
  }

}

export const searchAds = async (req, res) => {
  try {
    const { value, type } = await req.body;
    const ads = await AdMessage.find();
    const searchedAds = ads.filter(ad => type === "category" ? ad.category.toLowerCase() === value.toLowerCase() : ad.title.toLowerCase().includes(value.toLowerCase()));
    if (searchedAds.length) {
      await res.status(201).json(searchedAds);
    } else { await res.json({ message: "Ничего не найдено" }); }
  } catch (e) { await res.status(409).json({ message: e.message }); }
}

export const getUserAds = async (req, res) => {
  const { userId } = await req.body;

  try {
    const ads = await AdMessage.find();
    const userAds = ads.filter((ad) => ad.creator == userId);

    res.status(200).json(userAds);

  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

export const sortAds = async (req, res) => {
  const { value } = await req.body;
  let sortedAds;

  try {
    switch (value) {
      case "cheap":
        sortedAds = await AdMessage.find().sort({ 'price': 1 });
        break;

      case "expensive":
        sortedAds = await AdMessage.find().sort({ 'price': -1 });
        break;

      case "old":
        sortedAds = await AdMessage.find().sort("-date").exec();
        break;

      case "new":
        sortedAds = await AdMessage.find().sort("date").exec();
        break;

      default:
        sortedAds = await AdMessage.find().lean();
        break;
    }

    res.status(200).json(sortedAds);

  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

export const getFavoriteAds = async (req, res) => {
  const { userId } = await req.body;

  try {
    const user = await User.findById(userId);
    const userFavoriteAds = [...user.favorites];

    const favoriteAds = await AdMessage.find({ _id: { $in: userFavoriteAds } });
    res.status(200).json(favoriteAds);

  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

export const clearFavoritesAds = async (req, res) => {
  const { userId } = await req.body;

  try {
    await User.findByIdAndUpdate(userId, { favorites: [] });
    res.status(200).json("Список избранных очищен!");

  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

export default router;