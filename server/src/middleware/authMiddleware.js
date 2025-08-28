// server/src/middleware/authMiddleware.js
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

export const auth = async (req, res, next) => {
  try {
    const bearer = req.headers.authorization || "";
    const tokenFromHeader = bearer.startsWith("Bearer ")
      ? bearer.slice(7)
      : null;

    const token = req.cookies?.token || tokenFromHeader;
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("_id name email");
    if (!req.user) return res.status(401).json({ message: "Unauthorized" });

    next();
  } catch (e) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};