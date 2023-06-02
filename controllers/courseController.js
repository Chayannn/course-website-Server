import { Course } from "../models/course.js";

export const getAllCourses = async (req, res, next) => {
  const courses = await Course.find();

  res.status(200).json({
    success: true,
    courses,
  });
};
