// src/modules/user/user.service.js
import { prisma } from "../../config/db.js";

// Helper: filter hanya field profile yang valid
function pickProfileFields(data) {
  const { fullName, email, address, phone } = data;
  return { fullName, email, address, phone };
}

// Ambil semua users + profile (admin only)
export async function getAllUsersProfile() {
  return prisma.user.findMany({
    select: {
      id: true,
      username: true,
      role: true,
      createdAt: true,
      profile: true,
    },
  });
}

// Ambil user + profile
export async function getUserProfile(userId) {
  return prisma.user.findUnique({
    where: { id: userId },
    include: { profile: true },
  });
}

// Create / Update profile (pakai upsert)
export async function upsertUserProfile(userId, data) {
  try {
    return await prisma.usersProfile.upsert({
      where: { userId },
      update: data,
      create: { ...data, userId },
    });
  } catch (err) {
    if (err.code === "P2002" && err.meta?.target?.includes("email")) {
      throw new Error("EMAIL_ALREADY_EXISTS");
    }
    throw err;
  }
}

// Delete user (cascade ke profile kalau di schema pakai onDelete: Cascade)
export async function deleteUserById(userId) {
  try {
    return await prisma.user.delete({ where: { id: userId } });
  } catch (err) {
    if (err.code === "P2025") {
      return null; // user tidak ditemukan
    }
    throw err;
  }
}
