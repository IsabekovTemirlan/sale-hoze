import User from "../models/User.js";
import expressValid from 'express-validator';
const { validationResult } = expressValid;

import bcrypt from "bcryptjs";
import secret from "../config.js";
import jwt from "jsonwebtoken";

export const generateAccessToke = (id, roles) => {
  const payload = {
    id, roles
  };
  return jwt.sign(payload, secret.secret, { expiresIn: "24h" })
}

export const loginAdmin = async (req, res) => {
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

    user.roles.forEach(role => {
      if (!role.includes("ADMIN")) {
        return res.status(400).json({ message: "У вас нет доступа!" })
      }
    })

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(400).json({ message: "Неправельный логин или пароль" })
    }
    // const token = jwt.sign( { userId: user.id }, "isabekovMakeMERN", { expiresIn: '1h' });
    const token = generateAccessToke(user._id, user.roles);

    res.json({ token, userName: login, msg: "Вы вошли!" });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}


export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (e) {
    console.log(e);
  }
}
