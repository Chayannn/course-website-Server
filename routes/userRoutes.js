import express from "express";
import {
  addToPlaylist,
  changePassword,
  forgetPassword,
  getMyProfile,
  login,
  logout,
  register,
  removeFromPlaylist,
  resetPassword,
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
// Forget Password
router.route("/forgetpassword").post(forgetPassword);
// Reset Password
router.route("/resetpassword/:token").put(resetPassword);

// Adding lectures to playlist
router.route("/addtoplaylist").post(isAuthenticated, addToPlaylist);

router.route("/removefromplaylist").delete(isAuthenticated, removeFromPlaylist);

export default router;
