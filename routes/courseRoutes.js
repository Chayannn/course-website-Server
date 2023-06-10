import express from "express";
import {
  addlectures,
  createCourse,
  getAllCourses,
  getCourselectures,
} from "../controllers/courseController.js";

import singleUpload from "../middlewares/multer.js";

const router = express.Router();

// Get all courses without lectures
router.route("/courses").get(getAllCourses);

// Create New Course Admin only
router.route("/createcourse").post(singleUpload, createCourse);

// Add Lecture,Delete Course,Get Course Details
router
  .route("/course/:id")
  .get(getCourselectures)
  .post(singleUpload, addlectures);

export default router;
