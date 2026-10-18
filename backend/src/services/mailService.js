import nodemailer from "nodemailer";

const getTransporter = () => {
	const user = process.env.SMTP_EMAIL;
	const pass = process.env.SMTP_PASSWORD;

	if (!user || !pass) {
		throw new Error(
			`Missing SMTP credentials: SMTP_EMAIL=${user ? "SET" : "MISSING"}, SMTP_PASSWORD=${pass ? "SET" : "MISSING"}`
		);
	}

	return nodemailer.createTransport({
		service: "gmail",
		auth: {
			user,
			pass,
		},
	});
};

export const sendOtpEmail = async (email, otp) => {
	const transporter = getTransporter();
	const mailOptions = {
		from: `"VibeLane Archive" <${process.env.SMTP_EMAIL}>`,
		to: email,
		subject: `VibeLane Security Code: ${otp}`,
		html: `
      <div style="background-color: #000; color: #ede4dd; font-family: monospace; padding: 40px; max-width: 500px; margin: auto;">
        <h1 style="letter-spacing: 4px; font-size: 24px; text-transform: uppercase; border-bottom: 1px solid #333; padding-bottom: 16px;">VIBELANE</h1>
        <p style="font-size: 13px; color: #888; margin-top: 24px; text-transform: uppercase; letter-spacing: 2px;">AUTHENTICATION PROTOCOL</p>
        <p style="font-size: 14px; margin: 16px 0;">Use the single-use authorization code below to access your client account:</p>
        <div style="background: #141414; border: 1px solid #333; text-align: center; padding: 24px; font-size: 36px; font-weight: bold; letter-spacing: 12px; color: #ede4dd; margin: 24px 0;">
          ${otp}
        </div>
        <p style="font-size: 11px; color: #666; margin-top: 24px;">Code valid for 10 minutes. Do not disclose this code to anyone.</p>
      </div>
    `,
	};

	return await transporter.sendMail(mailOptions);
};
