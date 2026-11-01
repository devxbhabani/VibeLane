import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { supabase } from "../config/db.js";
import { sendOtpEmail } from "../services/mailService.js";

const JWT_SECRET = process.env.JWT_SECRET || "$vibelane_2026$";

const createToken = (user) => {
	return jwt.sign(
		{ id: user.id, email: user.email, role: user.role },
		JWT_SECRET,
		{
			expiresIn: "30d",
		},
	);
};

// Helper to generate & send an OTP to email
const generateAndSendOtp = async (email, type = "signup") => {
	const cleanEmail = email.toLowerCase().trim();
	const otp = Math.floor(100000 + Math.random() * 900000).toString();
	const otpHash = await bcrypt.hash(otp, 10);
	const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

	if (supabase) {
		// Clear existing OTPs for this email & type
		await supabase
			.from("otp_verifications")
			.delete()
			.eq("email", cleanEmail)
			.eq("type", type);

		const { error } = await supabase.from("otp_verifications").insert([
			{
				email: cleanEmail,
				otp_hash: otpHash,
				type,
				expires_at: expiresAt,
			},
		]);

		if (error) {
			console.error("[generateAndSendOtp] Supabase insert error:", error);
			throw error;
		}
	}

	// Send through Nodemailer Gmail SMTP
	await sendOtpEmail(cleanEmail, otp);
	return otp;
};

// SIGN UP
export const signup = async (req, res, next) => {
	try {
		const { name, email, password } = req.body;
		if (!email || !password) {
			return res
				.status(400)
				.json({ error: "Email and password are required" });
		}

		if (password.length < 6) {
			return res
				.status(400)
				.json({ error: "Password must be atleast 6 characters" });
		}

		const cleanEmail = email.toLowerCase().trim();

		const { data: existingUser } = await supabase
			.from("users")
			.select("id, is_verified")
			.eq("email", cleanEmail)
			.maybeSingle();

		if (existingUser && existingUser.is_verified) {
			return res.status(400).json({
				error: "User with this email already exists. Please Log In.",
			});
		}

		const saltRounds = 12;
		const passwordHash = await bcrypt.hash(password, saltRounds);

		// Insert or update unverified user
		if (existingUser && !existingUser.is_verified) {
			const { error } = await supabase
				.from("users")
				.update({
					name: name || "",
					password_hash: passwordHash,
					updated_at: new Date(),
				})
				.eq("email", cleanEmail);
			if (error) throw error;
		} else {
			const { error } = await supabase.from("users").insert([
				{
					name: name || "",
					email: cleanEmail,
					password_hash: passwordHash,
					is_verified: false,
					role: "customer",
				},
			]);
			if (error) throw error;
		}

		// Dispatch OTP
		await generateAndSendOtp(cleanEmail, "signup");

		res.status(201).json({
			success: true,
			message: "Registration initiated. Verification OTP shared to email.",
			email: cleanEmail,
		});
	} catch (error) {
		console.error("[signup error]:", error);
		next(error);
	}
};

// RESEND OTP (Called directly from verify-otp page)
export const resendOtp = async (req, res, next) => {
	try {
		const { email } = req.body;
		if (!email) {
			return res.status(400).json({ error: "Email is required." });
		}

		const cleanEmail = email.toLowerCase().trim();
		await generateAndSendOtp(cleanEmail, "signup");

		return res.status(200).json({
			success: true,
			message: "A fresh verification code has been dispatched to your email.",
		});
	} catch (error) {
		console.error("[resendOtp error]:", error);
		next(error);
	}
};

// VERIFY SIGNUP OTP
export const verifySignUpOtp = async (req, res, next) => {
	try {
		const { email, otp } = req.body;

		if (!email || !otp) {
			return res.status(400).json({ error: "Email and OTP are required." });
		}

		const cleanEmail = email.toLowerCase().trim();

		// Fetch latest otp record
		const { data: record, error: fetchError } = await supabase
			.from("otp_verifications")
			.select("*")
			.eq("email", cleanEmail)
			.eq("type", "signup")
			.order("created_at", { ascending: false })
			.limit(1)
			.maybeSingle();

		if (fetchError || !record) {
			return res.status(400).json({ error: "Invalid or expired OTP. Request a new one." });
		}

		if (new Date() > new Date(record.expires_at)) {
			await supabase.from("otp_verifications").delete().eq("id", record.id);
			return res
				.status(400)
				.json({ error: "OTP expired. Please request a new one." });
		}

		// Compare OTP hash
		const isMatch = await bcrypt.compare(String(otp).trim(), record.otp_hash);
		if (!isMatch) {
			return res.status(400).json({ error: "Invalid verification code." });
		}

		await supabase.from("otp_verifications").delete().eq("id", record.id);

		// Mark user as verified
		const { data: updatedUser, error: updateError } = await supabase
			.from("users")
			.update({ is_verified: true, updated_at: new Date() })
			.eq("email", cleanEmail)
			.select(
				"id, name, email, phone, address, city, postal_code, country, is_verified, role",
			)
			.single();

		if (updateError) throw updateError;

		const token = createToken(updatedUser);
		res.json({
			success: true,
			message: "Account verified successfully.",
			token,
			user: updatedUser,
		});
	} catch (error) {
		console.error("[verifySignUpOtp error]:", error);
		next(error);
	}
};

// LOGIN
export const login = async (req, res, next) => {
	try {
		const { email, password } = req.body;

		if (!email || !password) {
			return res.status(400).json({ error: "Email and password are required" });
		}

		const cleanEmail = email.toLowerCase().trim();

		// Fetch user
		const { data: user, error } = await supabase
			.from("users")
			.select("*")
			.eq("email", cleanEmail)
			.maybeSingle();

		if (error || !user) {
			return res.status(401).json({ error: "Invalid Credentials" });
		}

		// Verify password first
		const isPasswordCorrect = await bcrypt.compare(
			password,
			user.password_hash,
		);
		if (!isPasswordCorrect) {
			return res.status(401).json({ error: "Invalid Credentials" });
		}

		// If user is not verified, automatically send OTP and redirect
		if (!user.is_verified) {
			await generateAndSendOtp(cleanEmail, "signup");

			return res.status(403).json({
				error: "Email not verified. A verification code has been dispatched to your email.",
				requiresVerification: true,
				email: cleanEmail,
			});
		}

		// Remove pass hash before returning user object
		delete user.password_hash;

		const token = createToken(user);

		res.status(200).json({
			success: true,
			message: "Authenticated successfully.",
			token,
			user,
		});
	} catch (error) {
		console.error("[login error]:", error);
		next(error);
	}
};
