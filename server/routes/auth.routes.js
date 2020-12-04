import express from 'express';
const {Router} = express;

import expressValid from 'express-validator';
const {check} = expressValid;

import {registerUser, loginUser} from "../controllers/auth.js";

const router = Router();

router.post(
    "/register",
  [check('password', 'Минимальная длина пароля 6 символов').isLength({min: 6})],
  registerUser);

router.post("/login",
  [check('password', 'Введите пароль').exists()],
  loginUser);

export default router;