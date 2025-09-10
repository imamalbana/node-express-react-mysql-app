// src/modules/user/user.route.js
import { Router } from "express";
import { authMiddleware } from "../auth/auth.middleware.js";
import { getProfile, updateProfile } from "./user.controller.js";

const router = Router();

// GET profile user yang sedang login
router.get("/me", authMiddleware, getProfile);

// CREATE/UPDATE profile user login
router.post("/me/profile", authMiddleware, updateProfile);

export default router;
