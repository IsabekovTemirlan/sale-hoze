import express from 'express';

import { getAds, createAd, likeAd, deleteAd, updateAd } from "../controllers/ads.js";

const router = express.Router();

router.get('/', getAds);
router.post('/', createAd);
router.patch('/:id/likeAd', likeAd);
router.patch('/:id', updateAd);
router.delete('/:id', deleteAd);

export default router;
