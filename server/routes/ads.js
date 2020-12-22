import express from 'express';
import User from "../models/User.js";

import {paginatedResults} from "../middleware/paginatedmiddleware.js";

import { getAds, createAd, likeAd, deleteAd, updateAd, searchAds } from "../controllers/ads.js";

const router = express.Router();

router.get('/', paginatedResults(User), getAds);
router.post('/search', searchAds)
router.post('/', createAd);
router.patch('/:id/likeAd', likeAd);
router.patch('/:id', updateAd);
router.post('/:id', deleteAd);

export default router;
