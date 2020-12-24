import express from 'express';
import expressValid from 'express-validator';
import {getUsers, loginAdmin, setAdminRoleForUser, revokeAdminRoleForUser, deleteUser} from "../controllers/admin.js";

const {check} = expressValid;

import roleMiddleware from "../middleware/roleMiddleware.js";
import authMiddleware from "../middleware/authmiddleware.js";

const router = express.Router();

router.get("/users", authMiddleware, roleMiddleware(["ADMIN"]), getUsers);
router.post("/users", authMiddleware, roleMiddleware(["ADMIN"]), setAdminRoleForUser);
router.post("/users/:id", authMiddleware, roleMiddleware(["ADMIN"]), deleteUser);
router.patch("/users", authMiddleware, roleMiddleware(["ADMIN"]), revokeAdminRoleForUser);
router.post("/",
  [check('password', 'Введите пароль').exists()], loginAdmin);

export default router;