// import jwt from "jsonwebtoken";

// const JWT_SECRET = process.env.JWT_SECRET;

// export const protect = (req, res, next) => {
//   const token = req.headers.authorization?.split(" ")[1];
//   if (!token) return res.status(401).json({ message: "Not authorized" });

//   try {
//     const decoded = jwt.verify(token, JWT_SECRET);
//     req.user = { id: decoded.userId }; // yahan fix
//     next();
//   } catch (err) {
//     res.status(401).json({ message: "Invalid token" });
//   }
// };

import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

export const protect = (req, res, next) => {
  let token;

  // 1. Try Authorization header
  if (req.headers.authorization?.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  }

  // 2. If not found, try cookies
  if (!token && req.cookies?.token) {
    token = req.cookies.token;
  }

  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = { id: decoded.userId };
    next();
  } catch (err) {
    console.error("Token verification error:", err);
    res.status(401).json({ message: "Invalid token" });
  }
};
