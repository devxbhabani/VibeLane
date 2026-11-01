import express from "express";
import {
	signup,
	login,
	verifySignUpOtp,
	resendOtp,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/verifyotp", verifySignUpOtp);
router.post("/resend-otp", resendOtp);
router.post("/login", login);

export default router;
