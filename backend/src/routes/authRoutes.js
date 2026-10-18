import express from "express";
import {
	signup,
	login,
	verifySignUpOtp,
} from "../controllers/authController.js";
import { authLimiter, otpLimiter } from "../middleware/rateLimiter.js";

const router = express.Router();

router.post("/signup", otpLimiter, signup);
router.post("/verifyotp", authLimiter, verifySignUpOtp);
router.post("/login", authLimiter, login);

export default router;
