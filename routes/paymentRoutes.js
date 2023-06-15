import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import {
  buySubscription,
  getRazorPayKey,
  paymentVerification,
} from "../controllers/paymentController.js";

const router = express.Router();

// Buy Subscription
router.route("/subscribe").get(isAuthenticated, buySubscription);

// Verify Payment and save refference in database
router.route("/paymentverification").post(isAuthenticated, paymentVerification);

// Get Razor Pay key
router.route("/razorpaykey").get(getRazorPayKey);

// Cancel Subscription

router.route('/subscribe/cancel').delete(isAuthenticated,)
export default router;
