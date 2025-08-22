import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

export const auth = async (req, res, next) => {
  try {
    const header = req.headers.authorization || "";
    const token = header.startsWith("Bearer ") ? header.slice(7) : null;

    if (!token) return res.status(401).json({ message: "No Token Found" });

    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const User = await User.findById(payload.id).select("-password");
    if (!User) return res.status(401).json({ message: "Invalid Token Found" });

    req.User = User;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized User" });
  }
};