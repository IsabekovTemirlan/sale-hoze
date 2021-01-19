import express from 'express';
const router = express.Router()
import uploadMulter from '../middleware/upload.js';
import validation from '../middleware/validation.js';

import { imgUpload } from '../controllers/imgUpload.js';

router.post('/', uploadMulter, validation, imgUpload)

export default router;