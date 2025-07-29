import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const JWT_SECRET = process.env.JWT_SECRET;

export const authMiddleware = async (req, res, next) => {
  try {
    // token from cookie (recommended)
    const token = req.cookies?.token;
    if (!token) {
      return res.status(401).json({ message: "Not authorized, token missing" });
    }

    // verify token
    const decoded = jwt.verify(token, JWT_SECRET);

    // find user
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    // attach full user to request
    req.user = user;

    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};
