import { prisma } from "../../config/db.js";

// Ambil semua users + profile
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

// Ambil 1 user + profile
export async function getUserProfile(userId) {
  return prisma.user.findUnique({
    where: { id: userId },
    include: { profile: true },
  });
}

// Create / Update profile (pakai upsert)
export async function upsertUserProfile(userId, data) {
  return prisma.profile.upsert({
    where: { userId },
    update: data,
    create: { ...data, userId },
  });
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
