import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import { verifyotpUser, resendOtpApi } from "../services/authServices";
import { useApp } from "../context/AppContext";
import { ArrowLeft, CheckCircle2, ShieldAlert } from "lucide-react";

export default function VerifyOtp() {
	const [searchParams] = useSearchParams();
	const navigate = useNavigate();
	const { handleLoginSuccess } = useApp();

	const email = searchParams.get("email") || "";
	const [otp, setOtp] = useState(["", "", "", "", "", ""]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const [resendStatus, setResendStatus] = useState("");
	const [countdown, setCountdown] = useState(60);

	useEffect(() => {
		if (countdown > 0) {
			const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
			return () => clearTimeout(timer);
		}
	}, [countdown]);

	const handleOtpChange = (index, value) => {
		if (!/^[0-9]?$/.test(value)) return;

		const nextOtp = [...otp];
		nextOtp[index] = value;
		setOtp(nextOtp);
		setError("");

		// Auto advance focus to the next box
		if (value && index < 5) {
			const nextInput = document.getElementById(`otp-box-${index + 1}`);
			if (nextInput) nextInput.focus();
		}
	};

	const handleKeyDown = (index, e) => {
		if (e.key === "Backspace" && !otp[index] && index > 0) {
			const prevInput = document.getElementById(`otp-box-${index - 1}`);
			if (prevInput) prevInput.focus();
		}
	};

	const handlePaste = (e) => {
		e.preventDefault();
		const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
		if (!pasted) return;

		const nextOtp = [...otp];
		for (let i = 0; i < 6; i++) {
			nextOtp[i] = pasted[i] || "";
		}
		setOtp(nextOtp);
		const lastIndex = Math.min(pasted.length - 1, 5);
		const nextInput = document.getElementById(`otp-box-${lastIndex}`);
		if (nextInput) nextInput.focus();
	};

	const handleResend = async () => {
		if (!email) {
			setError("No email address provided to resend code.");
			return;
		}

		try {
			setError("");
			setResendStatus("Dispatching fresh code...");
			await resendOtpApi(email);
			setResendStatus("New 6-digit code sent to your inbox!");
			setCountdown(60);
			setTimeout(() => setResendStatus(""), 4000);
		} catch (err) {
			setError(err.message || "Failed to resend verification code.");
			setResendStatus("");
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const fullOtp = otp.join("");
		if (fullOtp.length !== 6) {
			setError("Please enter the complete 6-digit access code.");
			return;
		}

		setLoading(true);
		setError("");

		try {
			const data = await verifyotpUser({ email, otp: fullOtp });
			handleLoginSuccess(data.user, data.token);
			navigate("/");
		} catch (err) {
			setError(err.message || "Invalid or expired code.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="min-h-screen pt-28 pb-20 px-6 flex items-center justify-center selection:bg-[#EDE4DD] selection:text-black">
			<div className="w-full max-w-md bg-[#0a0a0a] border border-white/15 p-8 md:p-10 shadow-2xl relative">
				<Link
					to="/login"
					className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest text-zinc-500 hover:text-white transition-colors mb-8"
				>
					<ArrowLeft className="w-3.5 h-3.5" />
					Return to Login
				</Link>

				<div className="mb-8">
					<p className="font-mono text-[10px] uppercase tracking-[0.3em] text-zinc-500 mb-2">
						SECURITY PROTOCOL // 2-FACTOR ACTIVATION
					</p>
					<h1
						className="text-3xl md:text-4xl font-black uppercase text-[#EDE4DD] tracking-tight"
						style={{ fontFamily: "'Inter Tight', -apple-system, sans-serif" }}
					>
						Verify Identity
					</h1>
					<p className="font-mono text-xs text-zinc-400 mt-2">
						A 6-digit cryptographic key was dispatched to:{" "}
						<span className="text-white font-bold">{email || "your email"}</span>
					</p>
				</div>

				{error && (
					<div className="mb-6 p-3.5 bg-red-500/10 border border-red-500/20 text-red-400 font-mono text-xs flex items-center gap-2">
						<ShieldAlert className="w-4 h-4 shrink-0" />
						<span>{error}</span>
					</div>
				)}

				{resendStatus && (
					<div className="mb-6 p-3.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono text-xs flex items-center gap-2">
						<CheckCircle2 className="w-4 h-4 shrink-0" />
						<span>{resendStatus}</span>
					</div>
				)}

				<form onSubmit={handleSubmit} className="flex flex-col gap-6">
					{/* 6 Digit Input Boxes */}
					<div className="flex justify-between gap-2.5" onPaste={handlePaste}>
						{otp.map((digit, idx) => (
							<input
								key={idx}
								id={`otp-box-${idx}`}
								type="text"
								maxLength={1}
								value={digit}
								onChange={(e) => handleOtpChange(idx, e.target.value)}
								onKeyDown={(e) => handleKeyDown(idx, e)}
								autoFocus={idx === 0}
								className="w-12 h-14 bg-black border border-white/20 text-center font-mono text-xl font-bold text-[#EDE4DD] focus:outline-none focus:border-[#EDE4DD] focus:ring-1 focus:ring-[#EDE4DD] transition-all"
							/>
						))}
					</div>

					<button
						type="submit"
						disabled={loading}
						className="mt-2 w-full py-4 bg-[#EDE4DD] hover:bg-white text-black font-mono uppercase tracking-[0.2em] text-xs font-bold transition-all duration-300 disabled:opacity-50 cursor-pointer active:scale-[0.99]"
					>
						{loading ? "VALIDATING KEY..." : "AUTHENTICATE & ENTER"}
					</button>
				</form>

				<div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between font-mono text-xs text-zinc-500">
					<span>Expired or missing code?</span>
					{countdown > 0 ? (
						<span>Resend in {countdown}s</span>
					) : (
						<button
							type="button"
							onClick={handleResend}
							className="text-[#EDE4DD] hover:underline cursor-pointer font-bold"
						>
							Request New Code
						</button>
					)}
				</div>
			</div>
		</div>
	);
}
