import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import {
	getUserProfile,
	updateUserProfile,
	getUserOrders,
} from "../services/userService";
import {
	User,
	Package,
	MapPin,
	ShieldCheck,
	ArrowRight,
	LogOut,
	Check,
	Edit3,
} from "lucide-react";

export default function Account() {
	const navigate = useNavigate();
	const { user, handleLoginSuccess, handleLogout, token } = useApp();

	const [loading, setLoading] = useState(true);
	const [updating, setUpdating] = useState(false);
	const [isEditing, setIsEditing] = useState(false);
	const [updateSuccess, setUpdateSuccess] = useState(false);
	const [error, setError] = useState("");
	const [ordersCount, setOrdersCount] = useState(0);

	const [formData, setFormData] = useState({
		name: "",
		email: "",
		phone: "",
		address: "",
		city: "",
		state: "",
		postal_code: "",
		country: "India",
	});

	useEffect(() => {
		if (!user) {
			navigate("/login");
			return;
		}

		const fetchAccountData = async () => {
			setLoading(true);
			setError("");
			try {
				const [fetchedUser, fetchedOrders] = await Promise.all([
					getUserProfile(user.id),
					getUserOrders(user.id).catch(() => []),
				]);

				if (fetchedUser) {
					setFormData({
						name: fetchedUser.name || "",
						email: fetchedUser.email || "",
						phone: fetchedUser.phone || "",
						address: fetchedUser.address || "",
						city: fetchedUser.city || "",
						state: fetchedUser.state || "",
						postal_code: fetchedUser.postal_code || "",
						country: fetchedUser.country || "India",
					});
				}

				setOrdersCount(
					Array.isArray(fetchedOrders) ? fetchedOrders.length : 0,
				);
			} catch (err) {
				setError(err.message || "Failed to load account information.");
			} finally {
				setLoading(false);
			}
		};

		fetchAccountData();
	}, [user, navigate]);

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
		setUpdateSuccess(false);
	};

	const handleProfileSubmit = async (e) => {
		e.preventDefault();
		setUpdating(true);
		setError("");
		setUpdateSuccess(false);

		try {
			const updated = await updateUserProfile(user.id, formData);
			handleLoginSuccess(updated, token);
			setUpdateSuccess(true);
			setIsEditing(false);
			setTimeout(() => setUpdateSuccess(false), 3000);
		} catch (err) {
			setError(err.message || "Failed to update profile.");
		} finally {
			setUpdating(false);
		}
	};

	if (!user) return null;

	const lineItem = (label, value) => (
		<div className="py-4 border-b border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2 font-mono">
			<span className="text-[11px] uppercase tracking-[0.2em] text-zinc-500">
				{label}
			</span>
			<span
				className="text-sm font-semibold text-[#EDE4DD]"
				style={{ fontFamily: "'Inter Tight', -apple-system, sans-serif" }}
			>
				{value || "—"}
			</span>
		</div>
	);

	return (
		<div className="min-h-screen pt-28 pb-24 px-6 md:px-12 w-full max-w-5xl mx-auto selection:bg-[#EDE4DD] selection:text-black">
			{/* Top Header */}
			<div className="mb-12 pb-6 border-b border-white/10 flex flex-col md:flex-row md:items-end justify-between gap-6">
				<div>
					<p className="font-mono text-[10px] uppercase tracking-[0.3em] text-zinc-500 mb-2">
						YOUR PROFILE // ARCHIVE ACCESS
					</p>
					<h1
						className="text-4xl md:text-6xl font-black uppercase text-[#EDE4DD] tracking-tight"
						style={{
							fontFamily: "'Inter Tight', -apple-system, sans-serif",
						}}
					>
						{formData.name || "Client"}
					</h1>
					<p className="font-mono text-xs text-zinc-400 mt-2">
						ID:{" "}
						<span
							className="text-white font-bold"
							style={{
								fontFamily: "'Inter Tight', -apple-system, sans-serif",
							}}
						>
							{user.email}
						</span>
					</p>
				</div>

				<div className="flex items-center gap-4">
					<button
						onClick={() => setIsEditing((prev) => !prev)}
						className="flex items-center gap-2 px-5 py-3 border border-white/20 hover:border-white text-[#EDE4DD] hover:bg-white/5 transition-colors font-mono text-xs uppercase tracking-widest cursor-pointer"
					>
						<Edit3 className="w-3.5 h-3.5" />
						{isEditing ? "View Details" : "Edit Profile"}
					</button>

					<button
						onClick={() => {
							handleLogout();
							navigate("/");
						}}
						className="flex items-center gap-2 px-5 py-3 border border-red-500/30 text-red-400 hover:bg-red-500/10 transition-colors font-mono text-xs uppercase tracking-widest cursor-pointer"
					>
						<LogOut className="w-3.5 h-3.5" />
						Sign Out
					</button>
				</div>
			</div>

			{/* Status Alerts */}
			{error && (
				<div className="mb-8 p-4 bg-red-500/10 border border-red-500/20 text-red-400 font-mono text-xs">
					{error}
				</div>
			)}

			{updateSuccess && (
				<div className="mb-8 p-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono text-xs flex items-center gap-2">
					<Check className="w-4 h-4 stroke-[2.5]" />
					<span>RECORD SYNCHRONIZED SUCCESSFULLY</span>
				</div>
			)}

			{/* Dedicated YOUR ORDERS Section Banner */}
			<div
				onClick={() => navigate("/orders")}
				className="group mb-12 p-6 md:p-8 border border-white/15 bg-white/5 hover:bg-[#EDE4DD] hover:text-black transition-all duration-300 cursor-pointer flex items-center justify-between"
			>
				<div className="flex items-center gap-5">
					<div className="w-12 h-12 bg-white/10 group-hover:bg-black/10 flex items-center justify-center transition-colors">
						<Package className="w-6 h-6 text-[#EDE4DD] group-hover:text-black transition-colors" />
					</div>
					<div>
						<h2
							className="text-2xl md:text-3xl font-black uppercase tracking-tight text-[#EDE4DD] group-hover:text-black transition-colors"
							style={{
								fontFamily: "'Inter Tight', -apple-system, sans-serif",
							}}
						>
							Your Orders
						</h2>
						<p className="font-mono text-xs text-zinc-400 group-hover:text-zinc-700 tracking-wider mt-1 uppercase">
							{ordersCount}{" "}
							{ordersCount === 1 ? "Acquisition" : "Acquisitions"} in
							archive • Track dispatch & view manifest
						</p>
					</div>
				</div>

				<div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-widest">
					<span className="hidden sm:inline">Inspect Manifest</span>
					<ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
				</div>
			</div>

			{/* Profile Details  */}
			{loading ? (
				<div className="py-16 text-center font-mono text-xs text-zinc-500 uppercase tracking-widest">
					Loading Client Records...
				</div>
			) : isEditing ? (
				/* Editable Form */
				<form
					onSubmit={handleProfileSubmit}
					className="bg-[#0a0a0a] border border-white/10 p-6 md:p-8 flex flex-col gap-6"
				>
					<h3 className="font-mono text-xs uppercase tracking-[0.25em] text-[#EDE4DD] font-bold border-b border-white/10 pb-3">
						Edit Identity & Shipping Destination
					</h3>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-mono">
						<div className="flex flex-col gap-1.5">
							<label className="text-[10px] uppercase tracking-widest text-zinc-400">
								Full Name
							</label>
							<input
								type="text"
								name="name"
								value={formData.name}
								onChange={handleInputChange}
								className="w-full bg-black border border-white/15 px-4 py-3 text-sm text-[#EDE4DD] focus:outline-none focus:border-[#EDE4DD] transition-colors"
								style={{
									fontFamily:
										"'Inter Tight', -apple-system, sans-serif",
								}}
							/>
						</div>

						<div className="flex flex-col gap-1.5">
							<label className="text-[10px] uppercase tracking-widest text-zinc-400">
								Contact Phone
							</label>
							<input
								type="tel"
								name="phone"
								value={formData.phone}
								onChange={handleInputChange}
								placeholder="+1 (555) 000-0000"
								className="w-full bg-black border border-white/15 px-4 py-3 text-sm text-[#EDE4DD] focus:outline-none focus:border-[#EDE4DD] transition-colors"
								style={{
									fontFamily:
										"'Inter Tight', -apple-system, sans-serif",
								}}
							/>
						</div>

						<div className="md:col-span-2 flex flex-col gap-1.5">
							<label className="text-[10px] uppercase tracking-widest text-zinc-400">
								Street Address
							</label>
							<input
								type="text"
								name="address"
								value={formData.address}
								onChange={handleInputChange}
								placeholder="144 Mercer Street"
								className="w-full bg-black border border-white/15 px-4 py-3 text-sm text-[#EDE4DD] focus:outline-none focus:border-[#EDE4DD] transition-colors"
								style={{
									fontFamily:
										"'Inter Tight', -apple-system, sans-serif",
								}}
							/>
						</div>

						<div className="flex flex-col gap-1.5">
							<label className="text-[10px] uppercase tracking-widest text-zinc-400">
								City
							</label>
							<input
								type="text"
								name="city"
								value={formData.city}
								onChange={handleInputChange}
								className="w-full bg-black border border-white/15 px-4 py-3 text-sm text-[#EDE4DD] focus:outline-none focus:border-[#EDE4DD] transition-colors"
								style={{
									fontFamily:
										"'Inter Tight', -apple-system, sans-serif",
								}}
							/>
						</div>

						<div className="grid grid-cols-2 gap-3">
							<div className="flex flex-col gap-1.5">
								<label className="text-[10px] uppercase tracking-widest text-zinc-400">
									State
								</label>
								<input
									type="text"
									name="state"
									value={formData.state}
									onChange={handleInputChange}
									className="w-full bg-black border border-white/15 px-4 py-3 text-sm text-[#EDE4DD] focus:outline-none focus:border-[#EDE4DD] transition-colors"
									style={{
										fontFamily:
											"'Inter Tight', -apple-system, sans-serif",
									}}
								/>
							</div>
							<div className="flex flex-col gap-1.5">
								<label className="text-[10px] uppercase tracking-widest text-zinc-400">
									Postal Code
								</label>
								<input
									type="text"
									name="postal_code"
									value={formData.postal_code}
									onChange={handleInputChange}
									className="w-full bg-black border border-white/15 px-4 py-3 text-sm text-[#EDE4DD] focus:outline-none focus:border-[#EDE4DD] transition-colors"
									style={{
										fontFamily:
											"'Inter Tight', -apple-system, sans-serif",
									}}
								/>
							</div>
						</div>
					</div>

					<div className="flex gap-4 pt-4 border-t border-white/10 font-mono text-xs">
						<button
							type="submit"
							disabled={updating}
							className="px-8 py-3.5 bg-[#EDE4DD] hover:bg-white text-black uppercase tracking-widest font-bold transition-all cursor-pointer"
						>
							{updating ? "Saving..." : "Save Changes"}
						</button>
						<button
							type="button"
							onClick={() => setIsEditing(false)}
							className="px-6 py-3.5 border border-white/15 text-zinc-400 hover:text-white uppercase tracking-widest transition-colors cursor-pointer"
						>
							Cancel
						</button>
					</div>
				</form>
			) : (
				/* Line by line display */
				<div className="bg-[#0a0a0a] border border-white/10 p-6 md:p-8 flex flex-col divide-y divide-white/10">
					<h3 className="font-mono text-xs uppercase tracking-[0.25em] text-[#EDE4DD] font-bold pb-4">
						Client Credentials & Address
					</h3>

					{lineItem("Legal Name", formData.name)}
					{lineItem("Email Destination", formData.email)}
					{lineItem("Phone Contact", formData.phone)}
					{lineItem("Street Address", formData.address)}
					{lineItem("City", formData.city)}
					{lineItem("State / Region", formData.state)}
					{lineItem("Postal Code", formData.postal_code)}
					{lineItem("Country", formData.country)}
				</div>
			)}
		</div>
	);
}
