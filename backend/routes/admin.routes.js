import express from "express";
import { authMiddleware } from "../middlewares/admin.middleware.js";
import { getAllUsers, makeAdmin, deleteUser } from "../controllers/admin.controller.js";

const router = express.Router();

router.get("/users", authMiddleware, getAllUsers);
router.put("/make-admin/:id", authMiddleware, makeAdmin);
router.delete("/users/:id", authMiddleware, deleteUser);

export default router;
