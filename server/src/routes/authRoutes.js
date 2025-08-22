import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import express, { json } from "express";
import { validationResult } from "express-validator";
import { registerRules, loginRules } from "../utils/validator.js";
import { auth } from "../middleware/authMiddleware.js";
import User from "../models/userModel.js";

const router = express.Router();

// For Registering
router.post("/register", registerRules, async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    const { name, email, password } = req.body;
    const existedUser = await User.findOne({ email });
    if (existedUser)
      return res.status(400).json({ message: "User Already Exists" });

    const hash = await bcrypt.hash(password, 10);
    const newUser = await User.create({ name, email, password: hash });
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "2d",
    });
    res.json({ token, newUser: { id: newUser._id, name, email } });
  } catch (error) {
    next(error);
  }
});

// For Login
router.post("/login", loginRules, async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    const { email, password } = req.body;
    const existedUser = await User.findOne({ email });
    if (!existedUser)
      return res.status(400).json({ message: "Invalid Credentials" });

    const okayUser = await bcrypt.compare(password, existedUser.password);
    if (!okayUser)
      return res.status(400).json({ message: "Invalid Credentials" });

    const token = jwt.sign({ id: existedUser._id }, process.env.JWT_SECRET, {
      expiresIn: "2d",
    });
    res.json({
      token,
      existedUser: {
        id: existedUser._id,
        name: existedUser.name,
        email: existedUser.email,
      },
    });
  } catch (error) {
    next(error);
  }
});

// For Me
router.get("/me", auth, async (req, res) => {
  res.json({ user: req.user });
});

export default router;