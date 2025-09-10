// src/modules/user/user.service.js
import { prisma } from "../../config/db.js";

// Ambil user + profile
export async function getUserProfile(userId) {
  return prisma.user.findUnique({
    where: { id: userId },
    include: { profile: true }, // join ke tabel UsersProfile
  });
}

// Create/Update profile (pakai upsert biar simpel)
export async function upsertUserProfile(userId, data) {
  return prisma.usersProfile.upsert({
    where: { userId },
    update: data,
    create: { ...data, userId },
  });
}
