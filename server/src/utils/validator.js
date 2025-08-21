import { body } from "express-validator";

export const registerRules = [
  body("name").notEmpty(),
  body("email").isEmail(),
  body("password").isLength({ min: 8 }),
];

export const loginRules = [
  body("email").isEmail(),
  body("password").notEmpty(),
];