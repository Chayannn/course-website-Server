import express from "express";
import {
  changePassword,
  getMyProfile,
  login,
  logout,
  register,
  updateProfile,
  updateProfilePicture,
} from "../controllers/userController.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

// To register a new user
router.route("/register").post(register);

// To Login
router.route("/login").post(login);
// To logout
router.route("/logout").get(logout);
// To get user profile
router.route("/me").get(isAuthenticated, getMyProfile);
// To change password
router.route("/changepassword").put(isAuthenticated, changePassword);
// To Update user profile
router.route("/updateprofile").put(isAuthenticated, updateProfile);
// To update user profile picture
router
  .route("/updateprofilepicture")
  .put(isAuthenticated, updateProfilePicture);

export default router;
