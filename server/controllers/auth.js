import User from "../models/User.js";
import Role from "../models/Role.js";
import expressValid from 'express-validator';
const { validationResult } = expressValid;

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import secret from "../config.js";

export const generateAccessToke = (id, roles) => {
  const payload = {
    id, roles
  };
  return jwt.sign(payload, secret.secret, {expiresIn: "24h"})
}

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

    const { login, password, email } = req.body;
    const candidate = await User.findOne({ login });
    const emailCandidate = await User.findOne({email});

    if (candidate) {
      return res.status(400).json({ message: "Такой пользовалтель уже существует" });
    }

    if (emailCandidate) {
      return res.status(400).json({ message: "Пользователь с таким email-ом уще существуев"})
    }

    const hashedPassword = bcrypt.hashSync(password, 12);
    const userRole = await Role.findOne({value: "USER"});
    const user = new User({ login, password: hashedPassword, email, roles: [userRole.value] });
    await user.save();
    res.status(201).json({ message: "Пользователь успешно создан!" });

  } catch (e) {
    res.status(500).json({ message: e.message });
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

    const { login, password } = req.body;
    const user = await User.findOne({ login });
    if (!user) {
      return res.status(400).json({ message: "Пользователь не найден", status: 400 })
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(400).json({ message: "Неправельный логин или пароль" })
    }
    // const token = jwt.sign( { userId: user.id }, "isabekovMakeMERN", { expiresIn: '1h' });
    const token = generateAccessToke(user._id, user.roles);

    res.json({ token, userId: user.id, userName: login, msg: "Вы вошли!", userAds: user.links });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}
