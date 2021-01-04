import express from 'express';
import User from "../models/User.js";

import {paginatedResults} from "../middleware/paginatedmiddleware.js";

import { getAds, createAd, likeAd, deleteAd, updateAd, searchAds, getUserAds, sortAds } from "../controllers/ads.js";

const router = express.Router();

router.get('/', paginatedResults(User), getAds);
router.post('/userads', getUserAds);
router.post('/search', searchAds);
router.post('/sort', sortAds);
router.post('/', createAd);
router.patch('/:id/likeAd', likeAd);
router.patch('/:id', updateAd);
router.post('/:id', deleteAd);

export default router;
