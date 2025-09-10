// src/modules/user/user.controller.js
import { getUserProfile, upsertUserProfile } from "./user.service.js";

export async function getProfile(req, res, next) {
  try {
    const user = await getUserProfile(req.user.userId); // userId dari token
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({
      id: user.id,
      username: user.username,
      role: user.role,
      createdAt: user.createdAt,
      profile: user.profile, // bisa null kalau belum ada
    });
  } catch (err) {
    next(err);
  }
}

export async function updateProfile(req, res, next) {
  try {
    const profile = await upsertUserProfile(req.user.userId, req.body);
    res.json({
      message: "Profile saved successfully",
      profile,
    });
  } catch (err) {
    next(err);
  }
}
