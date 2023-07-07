import express from "express";
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
// 3. Get Profile
router.route("/profile").get(getUserProfile);
// 4. Update Profile
router.route("/profile").put(updateUserProfile);
// 5. Logout
router.route("/logout").post(logoutUser);

export default router;
