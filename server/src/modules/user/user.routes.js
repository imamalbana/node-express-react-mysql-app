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

// Admin: ambil semua profiles
router.get("/", authMiddleware, roleMiddleware(["ADMIN"]), getAllProfiles);

// User: ambil profile sendiri
router.get("/me", authMiddleware, getProfile);

// User: update profile sendiri
router.patch(
  "/me/profile",
  authMiddleware,
  validate(profileSchema),
  updateProfile
);

// User: delete akun sendiri
router.delete("/me", authMiddleware, deleteMyAccount);

// Admin: delete user lain
router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware(["ADMIN"]),
  deleteUserByAdmin
);

export default router;
