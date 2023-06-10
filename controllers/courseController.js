import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import { Course } from "../models/course.js";

import ErrorHandler from "../utils/errorHandler.js";

export const getAllCourses = catchAsyncError(async (req, res, next) => {
  const courses = await Course.find().select("-lectures");

  res.status(200).json({
    success: true,
    courses,
  });
});

// To create a new course
export const createCourse = catchAsyncError(async (req, res, next) => {
  const { title, description, category, createdBy } = req.body;

  if (!title || !description || !category || !createdBy)
    return next(new ErrorHandler("PLease add all fields", 400));

  // const file = req.file;

  await Course.create({
    title,
    description,
    category,
    createdBy,
    poster: {
      public_id: "temp",
      url: "temp",
    },
  });

  res.status(201).json({
    success: true,
    message: "Course Created Successfully.You can add lectures now",
  });
});

export const getCourselectures = catchAsyncError(async (req, res, next) => {
  const course = await Course.findById(req.params.id);

  if (!course) return next(new ErrorHandler("Course not found", 404));

  course.views += 1;

  await course.save();

  res.status(200).json({
    success: true,
    lectures: course.lectures,
  });
});
export const addlectures = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;

  const { title, description } = req.body;

  // const file = req.file;

  const course = await Course.findById(id);

  if (!course) return next(new ErrorHandler("Course not found", 404));

  // Upload file here

  course.lectures.push({
    title,
    description,
    video: {
      public_id: "url",
      url: "url",
    },
  });

  course.numOfVideos = course.lectures.length;
  
  await course.save();

  res.status(200).json({
    success: true,
    lectures: "Lecture added in course",
  });
});
