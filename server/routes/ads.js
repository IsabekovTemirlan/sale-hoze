import express from 'express';

import { getAds, createAd, likeAd, deleteAd } from "../controllers/ads.js";

const router = express.Router();

router.get('/', getAds);
router.post('/', createAd);
router.patch('/:id/likeAd', likeAd);
router.delete('/:id', deleteAd);

export default router;
