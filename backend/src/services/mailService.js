import { Resend } from "resend";

export const sendOtpEmail = async (email, otp) => {
	const apiKey = process.env.RESEND_API_KEY;

	if (!apiKey) {
		throw new Error(
			"Missing RESEND_API_KEY in environment variables. Please add your Resend API key to .env and Render.",
		);
	}

	const resend = new Resend(apiKey);

	const fromAddress =
		process.env.RESEND_FROM_EMAIL || "VibeLane <onboarding@resend.dev>";

	const { data, error } = await resend.emails.send({
		from: fromAddress,
		to: [email],
		subject: `VibeLane Security Code: ${otp}`,
		html: `
        <div style="background-color: #000; color: #ede4dd; font-family: monospace; padding: 40px; max-width: 500px; margin: auto;">
        	<h1 style="letter-spacing: 4px; font-size: 24px; text-transform: uppercase; border-bottom: 1px solid #333; padding-bottom: 16px;">VIBELANE</h1>
          	<p style="font-size: 13px; color: #888; margin-top: 24px; text-transform: uppercase; letter-spacing: 2px;">AUTHENTICATION PROTOCOL</p>
          	<p style="font-size: 14px; margin: 16px 0;">Use the single-use authorization code below to access your client account:</p>
          <div style="background: #141414; border: 1px solid #333; text-align: center; padding: 24px; font-size: 36px; font-weight: bold; letter-spacing: 12px; color: #ede4dd; margin: 24px 0;">
            ${otp}
        	</div>
          <p style="font-size: 11px; color: #666; margin-top: 24px;">Code valid for 5 minutes. Do not disclose this code to anyone.</p>
        </div>
      `,
	});

	if (error) {
		throw new Error(
			`Resend email transmission failed: ${error.message || JSON.stringify(error)}`,
		);
	}

	return data;
};
