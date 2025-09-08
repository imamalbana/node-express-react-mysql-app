import prisma from "../../config/db.js";
import { generateToken } from "../../utils/jwt.js";
import { hashPassword, comparePassword } from "../../utils/hash";

export async function registerUser({ username, password, role }) {
  // Cek apakah user dengan username yang sama sudah ada
  const existingUser = await prisma.user.findUnique({ where: { username } });
  if (existingUser) {
    throw new Error("Username already in use");
  }
  // Hash password sebelum disimpan
  const hashedPassword = await hashPassword(password);
  return await prisma.user.create({
    data: { username, password: hashedPassword, role },
    select: {
      id: true,
      username: true,
      role: true,
      createdAt: true,
    },
  });
}

export async function loginUser({ username, password }) {
  const user = await prisma.user.findUnique({ where: { username } });
  if (!user) {
    throw new Error("Invalid username or password");
  }
  // Verifikasi password
  const isPasswordValid = await comparePassword(password, user.password);
  if (!isPasswordValid) {
    throw new Error("Invalid username or password");
  }
  // Generate JWT token
  const token = generateToken({
    userId: user.id,
    username: user.username,
    role: user.role,
  });
  return {
    id: user.id,
    username: user.username,
    role: user.role,
    token,
  };
}
