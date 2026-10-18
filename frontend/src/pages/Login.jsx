import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { loginUser } from "../services/authServices";
import { ArrowLeft, Lock, ArrowRight } from "lucide-react";

export default function Login() {
	const navigate = useNavigate();
	const { handleLoginSuccess } = useApp();

	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	const handleChange = (e) => {
		setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
		setError("");
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		setError("");

		try {
			const data = await loginUser(formData);
			handleLoginSuccess(data.user, data.token);
			navigate("/");
		} catch (err) {
			if (err.message.toLowerCase().includes("verify")) {
				navigate(`/verify-otp?email=${encodeURIComponent(formData.email)}`);
			} else {
				setError(err.message || "Invalid credentials.");
			}
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="min-h-screen pt-28 pb-20 px-6 flex items-center justify-center selection:bg-[#EDE4DD] selection:text-black">
			<div className="w-full max-w-md bg-[#0a0a0a] border border-white/15 p-8 md:p-10 shadow-2xl relative">
				{/* Back button */}
				<Link
					to="/"
					className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest text-zinc-500 hover:text-white transition-colors mb-8"
				>
					<ArrowLeft className="w-3.5 h-3.5" />
					Return to Archive
				</Link>

				<div className="mb-8">
					<p className="font-mono text-[10px] uppercase tracking-[0.3em] text-zinc-500 mb-2">
						ACCESS PROTOCOL // SECURE GATEWAY
					</p>
					<h1
						className="text-3xl md:text-4xl font-black uppercase text-[#EDE4DD] tracking-tight"
						style={{
							fontFamily: "'Inter Tight', -apple-system, sans-serif",
						}}
					>
						Client Sign In
					</h1>
				</div>

				{error && (
					<div className="mb-6 p-3.5 bg-red-500/10 border border-red-500/20 text-red-400 font-mono text-xs">
						{error}
					</div>
				)}

				<form onSubmit={handleSubmit} className="flex flex-col gap-5">
					<div className="flex flex-col gap-1.5 font-mono">
						<label className="text-[10px] uppercase tracking-widest text-zinc-400">
							Email Destination
						</label>
						<input
							type="email"
							name="email"
							required
							value={formData.email}
							onChange={handleChange}
							placeholder="client@vibelane.com"
							className="w-full bg-black border border-white/15 px-4 py-3.5 text-sm text-[#EDE4DD] placeholder-zinc-700 focus:outline-none focus:border-[#EDE4DD] transition-colors"
							style={{
								fontFamily: "'Inter Tight', -apple-system, sans-serif",
							}}
						/>
					</div>

					<div className="flex flex-col gap-1.5 font-mono">
						<div className="flex justify-between items-center">
							<label className="text-[10px] uppercase tracking-widest text-zinc-400">
								Encrypted Password
							</label>
						</div>
						<input
							type="password"
							name="password"
							required
							value={formData.password}
							onChange={handleChange}
							placeholder="••••••••••••"
							className="w-full bg-black border border-white/15 px-4 py-3.5 text-sm text-[#EDE4DD] placeholder-zinc-700 focus:outline-none focus:border-[#EDE4DD] transition-colors"
							style={{
								fontFamily: "'Inter Tight', -apple-system, sans-serif",
							}}
						/>
					</div>

					<button
						type="submit"
						disabled={loading}
						className="mt-3 w-full py-4 bg-[#EDE4DD] hover:bg-white text-black font-mono uppercase tracking-[0.2em] text-xs font-bold transition-all duration-300 disabled:opacity-50 cursor-pointer active:scale-[0.99] flex items-center justify-center gap-2"
					>
						<span>
							{loading ? "AUTHENTICATING..." : "AUTHORIZE ACCESS"}
						</span>
						{!loading && <ArrowRight className="w-3.5 h-3.5" />}
					</button>
				</form>

				<div className="mt-8 pt-6 border-t border-white/10 flex flex-col gap-3 font-mono text-xs text-center">
					<p className="text-zinc-500">
						Unregistered identity?{" "}
						<Link
							to="/signup"
							className="text-[#EDE4DD] hover:underline font-bold"
							style={{
								fontFamily: "'Inter Tight', -apple-system, sans-serif",
							}}
						>
							Request Access / Sign Up
						</Link>
					</p>
				</div>
			</div>
		</div>
	);
}
