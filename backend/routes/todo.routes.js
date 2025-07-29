import express from "express";
import { createPost, getAllPosts } from "../controllers/todo.controller.js";
import { protect } from "../middlewares/auth.middlewares.js";

const router = express.Router();

// Get all todos (public)
router.get("/", getAllPosts);

// Create new todo (protected)
router.post("/",protect,  createPost);

export default router;
