import User from "../models/User.js";
import expressValid from 'express-validator';
const {validationResult} = expressValid;

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// logic for user registration
export const registerUser = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: "Некорректные данные при регистрации"
      })
    }

    const {login, password} = req.body;

    const candidate = await User.findOne({login});

    if (candidate) {
      return res.status(400).json({message: "Такой пользовалтель уже существует"});
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User({login, password: hashedPassword});

    await user.save();

    res.status(201).json({message: "Пользователь успешно создан!"});

  } catch (e) {
    res.status(500).json({message: e.message});
  }

}

// logic for user login
export const loginUser = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: "Некорректные данные при входе в систему"
      })
    }

    const {login, password} = req.body;

    const user = await User.findOne({login});

    if (!user) {
      return res.status(400).json({message: "Пользователь не найден", status: 400})
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
      return res.status(400).json({message: "Неправельный логин или пароль"})
    }

    const token = jwt.sign(
      {userId: user.id},
      "isabekovMakeMERN",
      {expiresIn: '1h'}
      );

    res.json({token, userId: user.id, userName: login, msg: "Вы вошли!", userAds: user.links});

  } catch (e) {
    res.status(500).json({message: e.message});
  }

}