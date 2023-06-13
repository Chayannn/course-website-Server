import express from "express";
import {
  addToPlaylist,
  changePassword,
  deleteMyProfile,
  deleteUser,
  forgetPassword,
  getAllUsers,
  getMyProfile,
  login,
  logout,
  register,
  removeFromPlaylist,
  resetPassword,
  updateProfile,
  updateProfilePicture,
  updateUserRole,
} from "../controllers/userController.js";
import { authorizeAdmin, isAuthenticated } from "../middlewares/auth.js";

import singleUpload from "../middlewares/multer.js";

const router = express.Router();

// To register a new user
router.route("/register").post(singleUpload, register);

// To Login
router.route("/login").post(login);
// To logout
router.route("/logout").get(logout);
// To get user profile
router.route("/me").get(isAuthenticated, getMyProfile);

// Delete my profile

router.route("/me").delete(isAuthenticated, deleteMyProfile);

// To change password
router.route("/changepassword").put(isAuthenticated, changePassword);
// To Update user profile
router.route("/updateprofile").put(isAuthenticated, updateProfile);
// To update user profile picture
router
  .route("/updateprofilepicture")
  .put(isAuthenticated, singleUpload, updateProfilePicture);
// Forget Password
router.route("/forgetpassword").post(forgetPassword);
// Reset Password
router.route("/resetpassword/:token").put(resetPassword);

// Adding lectures to playlist
router.route("/addtoplaylist").post(isAuthenticated, addToPlaylist);

router.route("/removefromplaylist").delete(isAuthenticated, removeFromPlaylist);

// Admin routes
router.route("/admin/users").get(isAuthenticated, authorizeAdmin, getAllUsers);

router
  .route("/admin/user/:id")
  .put(isAuthenticated, authorizeAdmin, updateUserRole)
  .delete(isAuthenticated, authorizeAdmin, deleteUser);

export default router;
