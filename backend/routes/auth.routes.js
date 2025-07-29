import express from "express";
import { register, login, logout, profile } from "../controllers/auth.controllers.js";

const router = express.Router();

// 🟢 Register Route
router.post("/register", register);

// 🟢 Login Route
router.post("/login", login);

// 🟢 Profile Route (Protected)
router.get("/profile", profile);

// 🟢 Logout Route
router.post("/logout", logout);

export default router;
