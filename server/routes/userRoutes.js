import express from "express";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();
import {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
} from "../controllers/userController.js";

// 1. Register
router.route("/").post(registerUser);
// 2. Login
router.route("/auth").post(authUser);
// 3. Get Profile - protected
router.route("/profile").get(protect, getUserProfile);
// 4. Update Profile - protected
router.route("/profile").put(protect, updateUserProfile);
// 5. Logout
router.route("/logout").post(logoutUser);

export default router;
