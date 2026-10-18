import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { supabase } from "../config/db.js";
import { sendOtpEmail } from "../services/mailService.js";

const JWT_SECRET = process.env.JWT_SECRET || "$vibelane_2026$";

const createToken = (user) => {
	return jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
		expiresIn: "30d",
	});
};

//SIGN UP
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

		const { data: existingUser } = await supabase
			.from("users")
			.select("id, is_verified")
			.eq("email", email.toLowerCase())
			.single();

		if (existingUser && existingUser.is_verified) {
			return res.status(400).json({
				error: "User with this email already exists. Please LogIn. ",
			});
		}

		const saltRounds = 12;
		const passwordHash = await bcrypt.hash(password, saltRounds);

		//insert / update unverified user
		let user;
		if (existingUser && !existingUser.is_verified) {
			const { data, error } = await supabase
				.from("users")
				.update({
					name: name || "",
					password_hash: passwordHash,
					updated_at: new Date(),
				})
				.eq("email", email.toLowerCase())
				.select()
				.single();
			if (error) throw error;
			user = data;
		} else {
			const { data, error } = await supabase
				.from("users")
				.insert([
					{
						name: name || "",
						email: email.toLowerCase(),
						password_hash: passwordHash,
						is_verified: false,
					},
				])
				.select()
				.single();
			if (error) throw error;
			user = data;
		}

		//generate 6-digit OTP
		const otp = Math.floor(100000 + Math.random() * 900000).toString();
		const otpHash = await bcrypt.hash(otp, 10);
		const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 mins

		//clear old otps
		await supabase
			.from("otp_verifications")
			.delete()
			.eq("email", email.toLowerCase());

		//save hashed_otp
		await supabase.from("otp_verifications").insert([
			{
				email: email.toLowerCase(),
				otp_hash: otpHash,
				type: "signup",
				expires_at: expiresAt,
			},
		]);

		//send email via nodemailer
		await sendOtpEmail(email.toLowerCase(), otp);

		res.status(201).json({
			success: true,
			message: "Registration initiated. Verification OTP shared to email.",
			email: email.toLowerCase(),
		});
	} catch (error) {
		next(error);
	}
};

//verify signup otp
export const verifySignUpOtp = async (req, res, next) => {
	try {
		const { email, otp } = req.body;

		if (!email || !otp) {
			return res.status(400).json({ error: "Email and OTP are required." });
		}

		//fetch latest otp record
		const { data: record, error: fetchError } = await supabase
			.from("otp_verifications")
			.select("*")
			.eq("email", email.toLowerCase())
			.eq("type", "signup")
			.order("created_at", { ascending: false })
			.limit(1)
			.single();

		if (fetchError || !record) {
			return res.status(400).json({ error: "Invalid or expired OTP." });
		}

		if (new Date() > new Date(record.expires_at)) {
			await supabase.from("otp_verifications").delete().eq("id", record.id);
			return res
				.status(400)
				.json({ error: "OTP expired. Request a new one." });
		}

		//compare otp hash
		const isMatch = await bcrypt.compare(String(otp).trim(), record.otp_hash);
		if (!isMatch) {
			return res.status(400).json({ error: "Invalid verification code." });
		}

		await supabase.from("otp_verifications").delete().eq("id", record.id);

		//mark user as verified
		const { data: updatedUser, error: updateError } = await supabase
			.from("users")
			.update({ is_verified: true, updated_at: new Date() })
			.eq("email", email.toLowerCase())
			.select(
				"id, name, email, phone, address, city, postal_code, country, is_verified",
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
		next(error);
	}
};

//LOGIN
export const login = async (req, res, next) => {
	try {
		const { email, password } = req.body;

		if (!email || !password) {
			return res.status(400).json("Email and password are required");
		}

		//fetch user with pass hash
		const { data: user, error } = await supabase
			.from("users")
			.select("*")
			.eq("email", email.toLowerCase())
			.single();

		if (error || !user) {
			return res.status(401).json({ error: "Invalid Credentials" });
		}

		//check if email was verified
		if (!user.is_verified) {
			return res.status(403).json({
				error: "Email not verified. Please verify your OTP first.",
				requiresVerification: true,
			});
		}

		//verify password with bcrypt
		const isPasswordCorrect = await bcrypt.compare(password, user.password_hash);
		if (!isPasswordCorrect) {
			return res.status(401).json({ error: "Invalid Credentials" });
		}

		//remove pass hash before returning user object
		delete user.password_hash;

		const token = createToken(user);

		res.status(200).json({
			success: true,
			message: "Authenticated successfully.",
			token,
			user,
		});
	} catch (error) {
		next(error);
	}
};
