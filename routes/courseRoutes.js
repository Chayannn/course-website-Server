import express from "express";
import {
  addLectures,
  createCourse,
  deleteCourse,
  deleteLecture,
  getAllCourses,
  getCourselectures,
} from "../controllers/courseController.js";

import singleUpload from "../middlewares/multer.js";
import { authorizeAdmin, isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

// Get all courses without lectures
router.route("/courses").get(getAllCourses);

// Create New Course Admin only
router
  .route("/createcourse")
  .post(isAuthenticated, authorizeAdmin, singleUpload, createCourse);

// Add Lecture,Delete Course,Get Course Details
router
  .route("/course/:id")
  .get(isAuthenticated, getCourselectures)
  .post(singleUpload, authorizeAdmin, addLectures)
  .delete(isAuthenticated, authorizeAdmin, deleteCourse);

// Delte lecture
router.route("/lecture").delete(isAuthenticated, authorizeAdmin, deleteLecture);

export default router;
