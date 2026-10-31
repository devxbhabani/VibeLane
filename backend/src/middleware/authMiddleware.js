import jwt from "jsonwebtoken";
import { supabase } from "../config/db.js";

const JWT_SECRET = process.env.JWT_SECRET || "$vibelane_2026$";

export const protect = async (req, res, next) => {
	try {
		let token;

		if (
			req.headers.authorization &&
			req.headers.authorization.startsWith("Bearer")
		) {
			token = req.headers.authorization.split(" ")[1];
		}

		if (!token) {
			return res.status(401).json({
				success: false,
				message: "Not authorized, no token provided",
			});
		}

		// Verify token
		const decoded = jwt.verify(token, JWT_SECRET);

		// Optionally fetch fresh user/role from DB if supabase is configured
		if (supabase) {
			const { data: user, error } = await supabase
				.from("users")
				.select("id, email, role")
				.eq("id", decoded.id)
				.single();

			if (!error && user) {
				req.user = user;
				return next();
			}
		}

		// Fallback to token payload if DB query is skipped or offline
		req.user = decoded;
		next();
	} catch (error) {
		return res.status(401).json({
			success: false,
			message: "Not authorized, token invalid or expired",
		});
	}
};

export const authorizeAdmin = (req, res, next) => {
	if (!req.user || req.user.role !== "admin") {
		return res.status(403).json({
			success: false,
			message: "Access Denied: Admin credentials required",
		});
	}
	next();
};
