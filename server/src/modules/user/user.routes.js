// src/modules/user/user.route.js
import { Router } from "express";
import {
  authMiddleware,
  validate,
  roleMiddleware,
} from "../auth/auth.middleware.js";
import {
  getProfile,
  updateProfile,
  getAllProfiles,
  deleteMyAccount,
  deleteUserByAdmin,
} from "./user.controller.js";
import { profileSchema } from "./user.validation.js";

const router = Router();

// Hanya admin bisa akses semua profiles
router.get("/", authMiddleware, roleMiddleware(["ADMIN"]), getAllProfiles);

// Semua user yang login bisa akses profile mereka sendiri
router.get("/me", authMiddleware, getProfile);

// Update profile sendiri
router.post(
  "/me/profile",
  authMiddleware,
  validate(profileSchema),
  updateProfile
);

// Delete akun sendiri beserta profile
router.delete("/me", authMiddleware, deleteMyAccount);
router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware(["ADMIN"]),
  deleteUserByAdmin
);

export default router;
