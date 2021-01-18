import Image from "../models/Image.js";

export const imgUpload = (req, res) => {
  try {
    let name = req.body.name;
    let path = req.file.path;

    const image = new Image({ name, path })
    res.status(200).json({id: image._id, url: image.path});

  } catch (error) {
    res.status(400).json(error.message);
  }
}