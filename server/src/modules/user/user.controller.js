// src/modules/user/user.controller.js
import {
  getUserProfile,
  upsertUserProfile,
  getAllUsersProfile,
  deleteUserById,
} from "./user.service.js";

// Admin: ambil semua users
export async function getAllProfiles(req, res, next) {
  try {
    const users = await getAllUsersProfile();
    return res.status(200).json({
      status: "success",
      results: users.length,
      data: users,
    });
  } catch (err) {
    next(err);
  }
}

// User: ambil profile sendiri
export async function getProfile(req, res, next) {
  try {
    const user = await getUserProfile(req.user.userId);
    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "User not found",
      });
    }

    return res.status(200).json({
      status: "success",
      data: {
        id: user.id,
        username: user.username,
        role: user.role,
        createdAt: user.createdAt,
        profile: user.profile,
      },
    });
  } catch (err) {
    next(err);
  }
}

// User: create / update profile
export async function updateProfile(req, res, next) {
  try {
    const profile = await upsertUserProfile(req.user.userId, req.body);
    return res.status(200).json({
      status: "success",
      message: "Profile saved successfully",
      data: profile,
    });
  } catch (err) {
    if (err.message === "EMAIL_ALREADY_EXISTS") {
      return res.status(400).json({
        status: "error",
        message: "Email already used by another user",
      });
    }
    next(err);
  }
}

// User: hapus akun sendiri
export async function deleteMyAccount(req, res, next) {
  try {
    const userId = req.user.userId;
    const deletedUser = await deleteUserById(userId);

    if (!deletedUser) {
      return res.status(404).json({
        status: "error",
        message: "User not found",
      });
    }

    return res.status(200).json({
      status: "success",
      message: "User and profile deleted successfully",
    });
  } catch (err) {
    next(err);
  }
}

// Admin: hapus akun user lain
export async function deleteUserByAdmin(req, res, next) {
  try {
    const userId = parseInt(req.params.id, 10);

    if (isNaN(userId)) {
      return res.status(400).json({
        status: "error",
        message: "Invalid user ID",
      });
    }

    // Admin tidak boleh hapus akun sendiri
    if (req.user.userId === userId) {
      return res.status(400).json({
        status: "error",
        message: "Admin cannot delete their own account",
      });
    }

    const deletedUser = await deleteUserById(userId);

    if (!deletedUser) {
      return res.status(404).json({
        status: "error",
        message: "User not found",
      });
    }

    return res.status(200).json({
      status: "success",
      message: `User with ID ${userId} deleted successfully`,
    });
  } catch (err) {
    next(err);
  }
}
