import AdMessage from "../models/adMessage.js";

export const getAds = async (req, res) => {
  try {
    const adMessages = await AdMessage.find();

    res.status(200).json(adMessages);
  } catch (e) {
    res.status(404).json({ message: e.message});
  }

}

export const createAd = async (req, res) => {
  const ad = req.body;

  const newAd = new AdMessage(ad);

  try {
    await newAd.save();

    res.status(201).json(newAd);
  } catch (e) {

    res.status(409).json({message: e.message})
  }
}