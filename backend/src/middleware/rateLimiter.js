import rateLimit from "express-rate-limit";

// Protects Signup & Login endpoints from brute force: 10 attempts per 15 mins
export const authLimiter = rateLimit({
	windowMs: 15 * 60 * 1000,
	max: 10,
	message: {
		success: false,
		message:
			"Too many authentication attempts. Please try again after 15 minutes.",
	},
	standardHeaders: true,
	legacyHeaders: false,
});

// Protects OTP sending (Nodemailer quotas): 3 emails per 15 mins per IP
export const otpLimiter = rateLimit({
	windowMs: 15 * 60 * 1000,
	max: 3,
	message: {
		success: false,
		message:
			"Too many OTP requests. Please wait 15 minutes before requesting again.",
	},
});
