import multer from 'multer';
import path from 'path';
import fs from 'fs';
import config from "../config.js";

const storage = multer.diskStorage({
  destination: async function (req, file, cb) {
    const { imgInfo } = await req.body;
    if (imgInfo) {
      if (!fs.existsSync(`${config.dirname}\\uploads\\${imgInfo}`)) {
        fs.mkdirSync(`${config.dirname}\\uploads\\${imgInfo}`);
      }

      cb(null, `./uploads\\${imgInfo}`);
    } else {
      cb(null, `./uploads`);
    }
  },
  filename: function (req, file, cb) {
    cb(null, 'sharingan' + '-' + Date.now() + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => { cb(null, true); };

let upload = multer({ storage, fileFilter });

export default upload.single('adImages');