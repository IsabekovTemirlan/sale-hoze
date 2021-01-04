import express from "express";
import Comment from "../models/Comment.js";

const router = express.Router();

export const adComment = async (req, res) => {
  const {id, author, value} = await req.body;
  const newComment = new Comment({owner: id, author, value});

  try {
    await newComment.save();
    res.status(200).json({message: 'Комментарий добавлен'});
  } catch (error) {
    res.status(400).json({message: error.message});
  }
}

export const getComments = async (req, res) => {
  const {id} = await req.body;

  try {
    const comments = await Comment.find({owner: id});
    res.status(200).json(comments);
    
  } catch (error) {
    res.status(400).json({message: error.message});
  }
}

export default router;