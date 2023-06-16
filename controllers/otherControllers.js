import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../utils/errorHandler.js";
import { sendEmail } from "../utils/sendEmail.js";

export const contact = catchAsyncError(async (req, res, next) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message)
    return new ErrorHandler("All fields are mandatory", 400);

  const to = process.env.MY_MAIL;

  const subject = "Contact from CourseBundler";

  const text = `Hi👋,I am ${name} and My email is ${email}. \n${message}`;

  await sendEmail(to, subject, text);

  res.status(200).json({
    success: true,
    message: "Your message has been sent!",
  });
});

export const courseRequest = catchAsyncError(async (req, res, next) => {
  const { name, email, message } = req.body;

  const to = process.env.MY_MAIL;

  const subject = "Request for a course on CourseBundler";

  const text = `Hi👋,I am ${name} and My email is ${email}. \n${message}`;

  await sendEmail(to, subject, text);

  res.status(200).json({
    success: true,
    message: "Your request has been sent!",
  });
});

export const getDashboardStats = catchAsyncError(async (req, res, next) => {
  res.status(200).json({
    success: true,
  });
});
