import { prisma } from "../../config/db.js";
import { generateToken } from "../../utils/jwt.js";
import { hashPassword, comparePassword } from "../../utils/hash.js";

export async function registerUser({ username, password, role }) {
  const existingUser = await prisma.user.findUnique({ where: { username } });
  if (existingUser) {
    throw new Error("USERNAME_TAKEN");
  }

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

  if (!user || !(await comparePassword(password, user.password))) {
    throw new Error("INVALID_CREDENTIALS");
  }

  const token = generateToken({
    userId: user.id,
    role: user.role,
  });

  return { token };
}
