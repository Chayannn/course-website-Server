import { catchAsyncError } from "../middlewares/catchAsyncError.js";

import ErrorHandler from "../utils/errorHandler.js";

import { User } from "../models/user.js";

import { sendToken } from "../utils/sendToken.js";

export const register = catchAsyncError(async (req, res, next) => {
  const { name, email, password } = req.body;

  //   const file = req.file;

  if (!name || !email || !password)
    return next(new ErrorHandler("Please Enter All Fields", 400));

  let user = await User.findOne({ email });

  if (user) return next(new ErrorHandler("User Already Exist", 409));

  //   Upload file on cloudinary

  user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: "tempid",
      url: "temp_url",
    },
  });

  sendToken(res, user, "Registered Successfully", 201);
});
