import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const SECRET = process.env.JWT_SECRET;
const EXPIRES = "1h"; // durasi token

export function generateToken(payload) {
  if (!SECRET) throw new Error("JWT_SECRET is not defined");
  return jwt.sign(payload, SECRET, { expiresIn: EXPIRES });
}

export function verifyToken(token) {
  if (!SECRET) throw new Error("JWT_SECRET is not defined");
  try {
    return jwt.verify(token, SECRET);
  } catch (err) {
    return null; // token invalid atau expired
  }
}
