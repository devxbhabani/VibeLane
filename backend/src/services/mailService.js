import { Resend } from "resend";
import nodemailer from "nodemailer";

export const sendOtpEmail = async (email, otp) => {
	const emailHtml = `
		<div style="background-color: #000; color: #ede4dd; font-family: monospace; padding: 40px; max-width: 500px; margin: auto; border: 1px solid #222;">
			<h1 style="letter-spacing: 4px; font-size: 24px; text-transform: uppercase; border-bottom: 1px solid #333; padding-bottom: 16px; color: #fff;">VIBELANE</h1>
			<p style="font-size: 13px; color: #888; margin-top: 24px; text-transform: uppercase; letter-spacing: 2px;">AUTHENTICATION PROTOCOL</p>
			<p style="font-size: 14px; margin: 16px 0; color: #ccc;">Use the single-use authorization code below to access your client account:</p>
			<div style="background: #141414; border: 1px solid #333; text-align: center; padding: 24px; font-size: 36px; font-weight: bold; letter-spacing: 12px; color: #ede4dd; margin: 24px 0;">
				${otp}
			</div>
			<p style="font-size: 11px; color: #666; margin-top: 24px;">Code valid for 5 minutes. Do not disclose this code to anyone.</p>
		</div>
	`;

	// If Gmail SMTP credentials exist (sends to ANY recipient without unverified domain restrictions)
	if (process.env.SMTP_EMAIL && process.env.SMTP_PASSWORD) {
		try {
			const transporter = nodemailer.createTransport({
				service: "gmail",
				auth: {
					user: process.env.SMTP_EMAIL,
					pass: process.env.SMTP_PASSWORD,
				},
			});

			const info = await transporter.sendMail({
				from: `"VibeLane Studio" <${process.env.SMTP_EMAIL}>`,
				to: email,
				subject: `VibeLane Security Code: ${otp}`,
				html: emailHtml,
			});

			console.log(
				`[mailService] OTP sent via Gmail SMTP to ${email} (ID: ${info.messageId})`,
			);
			return info;
		} catch (smtpErr) {
			console.warn(
				`[mailService] Gmail SMTP attempt failed: ${smtpErr.message}. Trying Resend...`,
			);
		}
	}

	// Resend API fallback
	const apiKey = process.env.RESEND_API_KEY;
	if (apiKey) {
		const resend = new Resend(apiKey);
		const fromAddress =
			process.env.RESEND_FROM_EMAIL || "VibeLane <onboarding@resend.dev>";

		const { data, error } = await resend.emails.send({
			from: fromAddress,
			to: [email],
			subject: `VibeLane Security Code: ${otp}`,
			html: emailHtml,
		});

		if (error) {
			console.error(
				`[mailService] Resend delivery failed: ${error.message || JSON.stringify(error)}`,
			);
			throw new Error(`Email transmission failed: ${error.message}`);
		}

		console.log(`[mailService] OTP sent via Resend to ${email}`);
		return data;
	}

	throw new Error(
		"No configured email provider (Nodemailer or Resend) available.",
	);
};
