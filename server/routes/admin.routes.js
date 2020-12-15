import express from 'express';
const {Router} = express;
import expressValid from 'express-validator';
const {check} = expressValid;
import {getUsers, loginAdmin} from "../controllers/admin.js";

import roleMiddleware from "../middleware/roleMiddleware.js";
import authMiddleware from "../middleware/authmiddleware.js";

const router = Router();

router.get("/users", authMiddleware, roleMiddleware(["ADMIN"]), getUsers);
router.post("/",
  [check('password', 'Введите пароль').exists()], loginAdmin);

export default router;