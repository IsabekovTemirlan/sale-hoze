import express from 'express';
import AdMessage from "../models/adMessage.js";

import {paginatedResults} from "../middleware/paginatedmiddleware.js";

import { getAds, createAd, likeAd, deleteAd, updateAd, searchAds, getUserAds, sortAds, getFavoriteAds, clearFavoritesAds } from "../controllers/ads.js";

const router = express.Router();

router.get('/', paginatedResults(AdMessage), getAds);
router.post('/', createAd);
router.post('/userads', getUserAds);
router.post('/search', searchAds);
router.post('/sort', sortAds);
router.post('/favorites', getFavoriteAds);
router.post('/userfavorites', likeAd);
router.post('/clearfavorites', clearFavoritesAds);
router.patch('/:id', updateAd);
router.post('/:id', deleteAd);

export default router;
