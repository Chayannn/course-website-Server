import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import { User } from "../models/user.js";
import { Payment } from "../models/Payment.js";
import ErrorHandler from "../utils/errorHandler.js";
import { instance } from "../server.js";
import crypto from "crypto";

export const buySubscription = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user._id);

  if (user.role === "admin")
    return next(new ErrorHandler("Admin Can't Buy Course", 400));

  const plan_id = process.env.PLAIN_ID || "plan_M1Kq0Tc7pRBOzq";

  const subscription = await instance.subscriptions.create({
    plan_id,
    customer_notify: 1,
    total_count: 12,
  });

  user.subscription.id = subscription.id;
  user.subscription.status = subscription.status;

  await user.save();

  res.status(201).json({
    success: true,
    SubscriptionID: subscription.id,
  });
});
export const paymentVerification = catchAsyncError(async (req, res, next) => {
  const { razorpay_payment_id, razorpay_subscription_id, razorpay_signature } =
    req.body;
  const user = await User.findById(req.user._id);

  const subscription_id = user.subscription.id;

  const generated_signature = crypto
    .createHmac("sha256", process.env.RAZORPAY_API_SECRET)
    .update(razorpay_payment_id + "|" + razorpay_subscription_id, "utf-8")
    .digest("hex");

  const isAuthentic = generated_signature === razorpay_signature;

  if (isAuthentic)
    return res.redirect(`${process.env.FRONTEND_URL}/paymentfail`);

  // Database comes here
  await Payment.create({
    razorpay_payment_id,
    razorpay_subscription_id,
    razorpay_signature,
  });

  user.subscription.status = "active";

  await user.save();

  res.redirect(
    `${process.env.FRONTEND_URL}/paymentsuccess?reference=${razorpay_payment_id}`
  );
});

export const getRazorPayKey = catchAsyncError(async (req, res, next) => {
  res.status(200).json({
    success: true,
    key: process.env.RAZORPAY_API_KEY,
  });
});
