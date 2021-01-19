import express from 'express';

import { adComment, getComments } from "../controllers/comments.js";

const router = express.Router();

router.post('/add', adComment);
router.post('/all', getComments);

export default router;
