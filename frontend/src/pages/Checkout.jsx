import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { createUserOrder } from "../services/userService";
import {
	ArrowLeft,
	ShieldCheck,
	Lock,
	CheckCircle2,
	CreditCard,
	Truck,
	Sparkles,
	QrCode,
	Banknote,
} from "lucide-react";

export default function Checkout() {
	const navigate = useNavigate();
	const { cart, clearCart, user } = useApp();

	const [formData, setFormData] = useState({
		email: user?.email || "",
		phone: "",
		firstName: "",
		lastName: "",
		address: "",
		apartment: "",
		city: "",
		state: "",
		postalCode: "",
		country: "India",
		paymentMethod: "card", // "card" | "upi" | "cod"
		cardNumber: "",
		expiry: "",
		cvc: "",
		upiId: "",
	});

	const [shippingOption, setShippingOption] = useState("standard");
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [orderSuccess, setOrderSuccess] = useState(false);
	const [orderId, setOrderId] = useState("");

	const subtotal = cart.reduce(
		(sum, item) => sum + item.price * item.quantity,
		0,
	);
	const shippingCost = shippingOption === "express" ? 25.0 : 0.0;
	const estimatedTax = subtotal * 0.08;
	const total = subtotal + shippingCost + estimatedTax;

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmitOrder = async (e) => {
		e.preventDefault();
		if (cart.length === 0) return;

		setIsSubmitting(true);

		const generatedId = `VL-${Math.floor(100000 + Math.random() * 900000)}`;

		try {
			await createUserOrder({
				order_ref: generatedId,
				user_id: user?.id || null,
				email: formData.email.toLowerCase(),
				items: cart,
				subtotal,
				shipping_fee: shippingCost,
				tax: estimatedTax,
				total,
				payment_method: formData.paymentMethod.toUpperCase(),
				shipping_address: {
					firstName: formData.firstName,
					lastName: formData.lastName,
					phone: formData.phone,
					address: formData.address,
					apartment: formData.apartment,
					city: formData.city,
					state: formData.state,
					postalCode: formData.postalCode,
					country: formData.country,
				},
			});
		} catch (err) {
			console.error("Order database persistence failed:", err);
		}

		setTimeout(() => {
			setOrderId(generatedId);
			setIsSubmitting(false);
			setOrderSuccess(true);
			clearCart();
		}, 1200);
	};

	if (orderSuccess) {
		return (
			<div className="min-h-screen pt-28 pb-24 px-6 md:px-12 flex flex-col items-center justify-center text-center selection:bg-[#EDE4DD] selection:text-black">
				<div className="w-16 h-16 rounded-full border border-emerald-500/30 bg-emerald-500/10 flex items-center justify-center mb-6 animate-in zoom-in-75 duration-700">
					<CheckCircle2 className="w-8 h-8 text-emerald-400 stroke-[1.75]" />
				</div>

				<p className="font-mono text-xs uppercase tracking-[0.3em] text-zinc-400 mb-2">
					TRANSACTION CONFIRMED // ARCHIVE ACQUIRED
				</p>
				<h1
					className="text-4xl md:text-6xl font-black uppercase text-[#EDE4DD] tracking-tight mb-4"
					style={{
						fontFamily: "'Inter Tight', -apple-system, sans-serif",
					}}
				>
					Order Received
				</h1>
				<p className="font-mono text-sm text-zinc-400 max-w-md mx-auto mb-2">
					Order Ref:{" "}
					<span className="text-white font-bold">{orderId}</span>
				</p>
				<p className="font-mono text-xs uppercase text-zinc-500 mb-2">
					Payment Method:{" "}
					<span className="text-[#EDE4DD] font-bold">
						{formData.paymentMethod === "card"
							? "Card (•••• 4242)"
							: formData.paymentMethod === "upi"
								? `UPI (${formData.upiId || "Transfer"})`
								: "Cash on Delivery (COD)"}
					</span>
				</p>
				<p className="text-xs text-zinc-500 max-w-sm mx-auto mb-10 leading-relaxed font-mono">
					A dispatch manifest and authentication protocol receipt have been
					relayed to{" "}
					<span className="text-zinc-300">
						{formData.email || "your email"}
					</span>
					.
				</p>

				<div className="flex gap-4">
					<Link
						to="/"
						className="px-8 py-4 bg-[#EDE4DD] hover:bg-white text-black font-mono uppercase tracking-widest text-xs font-bold transition-all duration-300"
					>
						Return to Archive
					</Link>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen pt-24 pb-24 px-6 md:px-12 w-full max-w-7xl mx-auto selection:bg-[#EDE4DD] selection:text-black">
			{/* Breadcrumb / Back button */}
			<div className="mb-8 flex items-center justify-between border-b border-white/10 pb-4">
				<Link
					to="/bag"
					className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-zinc-400 hover:text-[#EDE4DD] transition-colors"
				>
					<ArrowLeft className="w-3.5 h-3.5" />
					Back to Bag
				</Link>
				{/* <span className="flex items-center gap-1.5 text-[11px] font-mono tracking-widest text-zinc-400 uppercase">
					<Lock className="w-3 h-3 text-emerald-400" />
					End-to-End Encrypted Checkout
				</span> */}
			</div>

			{cart.length === 0 ? (
				<div className="py-24 text-center">
					<h2 className="text-3xl font-black uppercase tracking-tight text-[#EDE4DD] mb-4">
						Your bag is currently empty
					</h2>
					<p className="font-mono text-xs uppercase tracking-widest text-zinc-500 mb-8">
						Select pieces from the archive before checking out.
					</p>
					<Link
						to="/"
						className="px-8 py-4 bg-[#EDE4DD] hover:bg-white text-black font-mono uppercase tracking-widest text-xs font-bold transition-all duration-300"
					>
						Explore Collection
					</Link>
				</div>
			) : (
				<div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
					{/* Left Column: Checkout Inputs (7 cols) */}
					<form
						onSubmit={handleSubmitOrder}
						className="lg:col-span-7 flex flex-col gap-10"
					>
						{/* Contact Information */}
						<div>
							<div className="flex items-center justify-between mb-4 border-b border-white/10 pb-2">
								<h2 className="font-mono text-xs uppercase tracking-[0.25em] text-[#EDE4DD] font-bold">
									01 / Contact Information
								</h2>
								<span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
									Order Updates
								</span>
							</div>

							<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
								{/* Email Input */}
								<div className="flex flex-col gap-1.5 font-mono">
									<label className="text-[10px] uppercase tracking-widest text-zinc-400">
										Email Address
									</label>
									<input
										type="email"
										name="email"
										required
										value={formData.email}
										onChange={handleInputChange}
										placeholder="archive@vibelane.com"
										className="w-full bg-[#0d0d0d] border border-white/15 px-4 py-3.5 text-sm text-[#EDE4DD] placeholder-zinc-700 focus:outline-none focus:border-[#EDE4DD] transition-colors"
										style={{
											fontFamily:
												"'Inter Tight', -apple-system, sans-serif",
										}}
									/>
								</div>

								{/* Phone Number Input */}
								<div className="flex flex-col gap-1.5 font-mono">
									<label className="text-[10px] uppercase tracking-widest text-zinc-400">
										Phone Number (For Courier Dispatch)
									</label>
									<input
										type="tel"
										name="phone"
										required
										value={formData.phone}
										onChange={handleInputChange}
										placeholder="+1 (555) 019-2834"
										className="w-full bg-[#0d0d0d] border border-white/15 px-4 py-3.5 text-sm text-[#EDE4DD] placeholder-zinc-700 focus:outline-none focus:border-[#EDE4DD] transition-colors"
										style={{
											fontFamily:
												"'Inter Tight', -apple-system, sans-serif",
										}}
									/>
								</div>
							</div>
						</div>

						{/* Shipping Address */}
						<div>
							<div className="flex items-center justify-between mb-4 border-b border-white/10 pb-2">
								<h2 className="font-mono text-xs uppercase tracking-[0.25em] text-[#EDE4DD] font-bold">
									02 / Shipping Destination
								</h2>
								<span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
									Global Dispatch
								</span>
							</div>

							<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
								<div className="flex flex-col gap-1.5">
									<label className="text-[10px] font-mono uppercase tracking-widest text-zinc-400">
										First Name
									</label>
									<input
										type="text"
										name="firstName"
										required
										value={formData.firstName}
										onChange={handleInputChange}
										placeholder="Alexander"
										className="w-full bg-[#0d0d0d] border border-white/15 px-4 py-3.5 text-sm text-[#EDE4DD] placeholder-zinc-700 focus:outline-none focus:border-[#EDE4DD] transition-colors "
										style={{
											fontFamily:
												"'Inter Tight', -apple-system, sans-serif",
										}}
									/>
								</div>
								<div className="flex flex-col gap-1.5">
									<label className="text-[10px] font-mono uppercase tracking-widest text-zinc-400">
										Last Name
									</label>
									<input
										type="text"
										name="lastName"
										required
										value={formData.lastName}
										onChange={handleInputChange}
										placeholder="Vane"
										className="w-full bg-[#0d0d0d] border border-white/15 px-4 py-3.5 text-sm text-[#EDE4DD] placeholder-zinc-700 focus:outline-none focus:border-[#EDE4DD] transition-colors "
										style={{
											fontFamily:
												"'Inter Tight', -apple-system, sans-serif",
										}}
									/>
								</div>

								<div className="sm:col-span-2 flex flex-col gap-1.5">
									<label className="text-[10px] font-mono uppercase tracking-widest text-zinc-400">
										Street Address
									</label>
									<input
										type="text"
										name="address"
										required
										value={formData.address}
										onChange={handleInputChange}
										placeholder="144 Mercer Street"
										className="w-full bg-[#0d0d0d] border border-white/15 px-4 py-3.5 text-sm text-[#EDE4DD] placeholder-zinc-700 focus:outline-none focus:border-[#EDE4DD] transition-colors "
										style={{
											fontFamily:
												"'Inter Tight', -apple-system, sans-serif",
										}}
									/>
								</div>

								<div className="sm:col-span-2 flex flex-col gap-1.5">
									<label className="text-[10px] font-mono uppercase tracking-widest text-zinc-400">
										Apartment, Suite, Unit (Optional)
									</label>
									<input
										type="text"
										name="apartment"
										value={formData.apartment}
										onChange={handleInputChange}
										placeholder="Floor 4B"
										className="w-full bg-[#0d0d0d] border border-white/15 px-4 py-3.5 text-sm text-[#EDE4DD] placeholder-zinc-700 focus:outline-none focus:border-[#EDE4DD] transition-colors "
										style={{
											fontFamily:
												"'Inter Tight', -apple-system, sans-serif",
										}}
									/>
								</div>

								<div className="flex flex-col gap-1.5">
									<label className="text-[10px] font-mono uppercase tracking-widest text-zinc-400">
										City
									</label>
									<input
										type="text"
										name="city"
										required
										value={formData.city}
										onChange={handleInputChange}
										placeholder="New York"
										className="w-full bg-[#0d0d0d] border border-white/15 px-4 py-3.5 text-sm text-[#EDE4DD] placeholder-zinc-700 focus:outline-none focus:border-[#EDE4DD] transition-colors "
										style={{
											fontFamily:
												"'Inter Tight', -apple-system, sans-serif",
										}}
									/>
								</div>

								<div className="grid grid-cols-2 gap-3">
									<div className="flex flex-col gap-1.5">
										<label className="text-[10px] font-mono uppercase tracking-widest text-zinc-400">
											State
										</label>
										<input
											type="text"
											name="state"
											required
											value={formData.state}
											onChange={handleInputChange}
											placeholder="NY"
											className="w-full bg-[#0d0d0d] border border-white/15 px-4 py-3.5 text-sm text-[#EDE4DD] placeholder-zinc-700 focus:outline-none focus:border-[#EDE4DD] transition-colors "
											style={{
												fontFamily:
													"'Inter Tight', -apple-system, sans-serif",
											}}
										/>
									</div>
									<div className="flex flex-col gap-1.5">
										<label className="text-[10px] font-mono uppercase tracking-widest text-zinc-400">
											Postal Code
										</label>
										<input
											type="text"
											name="postalCode"
											required
											value={formData.postalCode}
											onChange={handleInputChange}
											placeholder="10012"
											className="w-full bg-[#0d0d0d] border border-white/15 px-4 py-3.5 text-sm text-[#EDE4DD] placeholder-zinc-700 focus:outline-none focus:border-[#EDE4DD] transition-colors "
											style={{
												fontFamily:
													"'Inter Tight', -apple-system, sans-serif",
											}}
										/>
									</div>
								</div>
							</div>
						</div>

						{/* Shipping Tier */}
						<div>
							<div className="flex items-center justify-between mb-4 border-b border-white/10 pb-2">
								<h2 className="font-mono text-xs uppercase tracking-[0.25em] text-[#EDE4DD] font-bold">
									03 / Dispatch Method
								</h2>
								<span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
									Tracked
								</span>
							</div>

							<div className="flex flex-col gap-3 font-mono">
								<label
									className={`flex items-center justify-between p-4 border cursor-pointer transition-all ${
										shippingOption === "standard"
											? "border-[#EDE4DD] bg-[#EDE4DD]/5"
											: "border-white/10 hover:border-white/20 bg-[#0d0d0d]"
									}`}
								>
									<div className="flex items-center gap-3">
										<input
											type="radio"
											name="shippingOption"
											value="standard"
											checked={shippingOption === "standard"}
											onChange={() => setShippingOption("standard")}
											className="accent-[#EDE4DD]"
										/>
										<div>
											<p className="text-xs uppercase font-bold text-[#EDE4DD]">
												Standard Secured Archive Courier
											</p>
											<p className="text-[11px] text-zinc-500">
												3-5 business days • Tracked with signature
											</p>
										</div>
									</div>
									<span className="text-xs font-bold text-[#EDE4DD]">
										FREE
									</span>
								</label>

								<label
									className={`flex items-center justify-between p-4 border cursor-pointer transition-all ${
										shippingOption === "express"
											? "border-[#EDE4DD] bg-[#EDE4DD]/5"
											: "border-white/10 hover:border-white/20 bg-[#0d0d0d]"
									}`}
								>
									<div className="flex items-center gap-3">
										<input
											type="radio"
											name="shippingOption"
											value="express"
											checked={shippingOption === "express"}
											onChange={() => setShippingOption("express")}
											className="accent-[#EDE4DD]"
										/>
										<div>
											<p className="text-xs uppercase font-bold text-[#EDE4DD]">
												Priority Air Express Courier
											</p>
											<p className="text-[11px] text-zinc-500">
												Next business day dispatch • Priority
												handling
											</p>
										</div>
									</div>
									<span className="text-xs font-bold text-[#EDE4DD]">
										$25.00
									</span>
								</label>
							</div>
						</div>

						{/* Payment Details */}
						<div>
							<div className="flex items-center justify-between mb-4 border-b border-white/10 pb-2">
								<h2 className="font-mono text-xs uppercase tracking-[0.25em] text-[#EDE4DD] font-bold">
									04 / Payment Method
								</h2>
								<span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest flex items-center gap-1">
									<ShieldCheck className="w-3.5 h-3.5" />
									Encrypted & Verified
								</span>
							</div>

							{/* Payment Method Selector Tabs */}
							<div className="grid grid-cols-3 gap-2 mb-4 font-mono">
								<button
									type="button"
									onClick={() =>
										setFormData((prev) => ({
											...prev,
											paymentMethod: "card",
										}))
									}
									className={`py-3 px-2 border flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer ${
										formData.paymentMethod === "card"
											? "border-[#EDE4DD] bg-[#EDE4DD]/10 text-white"
											: "border-white/10 hover:border-white/25 text-zinc-400 bg-[#0d0d0d]"
									}`}
								>
									<CreditCard className="w-4 h-4" />
									<span className="text-[10px] uppercase font-bold tracking-wider">
										Card
									</span>
								</button>

								<button
									type="button"
									onClick={() =>
										setFormData((prev) => ({
											...prev,
											paymentMethod: "upi",
										}))
									}
									className={`py-3 px-2 border flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer ${
										formData.paymentMethod === "upi"
											? "border-[#EDE4DD] bg-[#EDE4DD]/10 text-white"
											: "border-white/10 hover:border-white/25 text-zinc-400 bg-[#0d0d0d]"
									}`}
								>
									<QrCode className="w-4 h-4" />
									<span className="text-[10px] uppercase font-bold tracking-wider">
										UPI / QR
									</span>
								</button>

								<button
									type="button"
									onClick={() =>
										setFormData((prev) => ({
											...prev,
											paymentMethod: "cod",
										}))
									}
									className={`py-3 px-2 border flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer ${
										formData.paymentMethod === "cod"
											? "border-[#EDE4DD] bg-[#EDE4DD]/10 text-white"
											: "border-white/10 hover:border-white/25 text-zinc-400 bg-[#0d0d0d]"
									}`}
								>
									<Banknote className="w-4 h-4" />
									<span className="text-[10px] uppercase font-bold tracking-wider">
										Cash on Delivery
									</span>
								</button>
							</div>

							{/* Card Payment Form */}
							{formData.paymentMethod === "card" && (
								<div className="bg-[#0d0d0d] border border-white/15 p-5 flex flex-col gap-4 font-mono animate-in fade-in duration-300">
									<div className="flex items-center justify-between border-b border-white/10 pb-3">
										<span className="text-xs uppercase tracking-wider text-[#EDE4DD] flex items-center gap-2">
											<CreditCard className="w-4 h-4 text-zinc-400" />
											Credit / Debit Card
										</span>
										<span className="text-[10px] text-zinc-500 uppercase tracking-widest">
											VISA / MASTERCARD / RUPAY
										</span>
									</div>

									<div className="flex flex-col gap-1.5">
										<label className="text-[10px] uppercase tracking-widest text-zinc-400">
											Card Number
										</label>
										<input
											type="text"
											name="cardNumber"
											required={formData.paymentMethod === "card"}
											maxLength={19}
											value={formData.cardNumber}
											onChange={handleInputChange}
											placeholder="4242 •••• •••• 4242"
											className="w-full bg-black border border-white/15 px-4 py-3 text-sm text-[#EDE4DD] placeholder-zinc-700 focus:outline-none focus:border-[#EDE4DD] transition-colors"
										/>
									</div>

									<div className="grid grid-cols-2 gap-4">
										<div className="flex flex-col gap-1.5">
											<label className="text-[10px] uppercase tracking-widest text-zinc-400">
												Expiration (MM/YY)
											</label>
											<input
												type="text"
												name="expiry"
												required={formData.paymentMethod === "card"}
												maxLength={5}
												value={formData.expiry}
												onChange={handleInputChange}
												placeholder="12/28"
												className="w-full bg-black border border-white/15 px-4 py-3 text-sm text-[#EDE4DD] placeholder-zinc-700 focus:outline-none focus:border-[#EDE4DD] transition-colors"
											/>
										</div>
										<div className="flex flex-col gap-1.5">
											<label className="text-[10px] uppercase tracking-widest text-zinc-400">
												Security Code (CVC)
											</label>
											<input
												type="password"
												name="cvc"
												required={formData.paymentMethod === "card"}
												maxLength={4}
												value={formData.cvc}
												onChange={handleInputChange}
												placeholder="•••"
												className="w-full bg-black border border-white/15 px-4 py-3 text-sm text-[#EDE4DD] placeholder-zinc-700 focus:outline-none focus:border-[#EDE4DD] transition-colors"
											/>
										</div>
									</div>
								</div>
							)}

							{/* UPI Payment Form */}
							{formData.paymentMethod === "upi" && (
								<div className="bg-[#0d0d0d] border border-white/15 p-5 flex flex-col gap-4 font-mono animate-in fade-in duration-300">
									<div className="flex items-center justify-between border-b border-white/10 pb-3">
										<span className="text-xs uppercase tracking-wider text-[#EDE4DD] flex items-center gap-2">
											<QrCode className="w-4 h-4 text-zinc-400" />
											Instant UPI Transfer
										</span>
										<span className="text-[10px] text-zinc-500 uppercase tracking-widest">
											GPay / PhonePe / Paytm / BHIM
										</span>
									</div>

									<div className="flex flex-col gap-1.5">
										<label className="text-[10px] uppercase tracking-widest text-zinc-400">
											Virtual Payment Address (VPA / UPI ID)
										</label>
										<input
											type="text"
											name="upiId"
											required={formData.paymentMethod === "upi"}
											value={formData.upiId}
											onChange={handleInputChange}
											placeholder="username@okhdfcbank or 9876543210@paytm"
											className="w-full bg-black border border-white/15 px-4 py-3 text-sm text-[#EDE4DD] placeholder-zinc-700 focus:outline-none focus:border-[#EDE4DD] transition-colors font-mono"
										/>
									</div>

									<div className="p-3 bg-white/5 border border-white/10 text-xs text-zinc-400 flex items-start gap-2.5">
										<span className="text-[#EDE4DD] font-bold">
											ℹ
										</span>
										<p className="leading-relaxed">
											A payment authorization request will be
											transmitted directly to your UPI app upon order
											submission.
										</p>
									</div>
								</div>
							)}

							{/* Cash on Delivery (COD) Form */}
							{formData.paymentMethod === "cod" && (
								<div className="bg-[#0d0d0d] border border-white/15 p-5 flex flex-col gap-3 font-mono animate-in fade-in duration-300">
									<div className="flex items-center justify-between border-b border-white/10 pb-3">
										<span className="text-xs uppercase tracking-wider text-[#EDE4DD] flex items-center gap-2">
											<Banknote className="w-4 h-4 text-zinc-400" />
											Cash on Delivery (COD)
										</span>
										<span className="text-[10px] text-emerald-400 uppercase tracking-widest">
											Zero Prepayment
										</span>
									</div>

									<p className="text-xs text-zinc-400 leading-relaxed">
										Pay with cash or UPI directly to the courier agent
										upon arrival at your shipping destination.
									</p>

									<div className="p-3 bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-300 flex items-center gap-2">
										<ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
										<span>
											Contactless verification protocol included.
										</span>
									</div>
								</div>
							)}
						</div>

						{/* Submit button on Mobile */}
						<div className="block lg:hidden">
							<button
								type="submit"
								disabled={isSubmitting}
								className="w-full py-5 bg-[#EDE4DD] hover:bg-white text-black font-mono uppercase tracking-[0.2em] text-xs font-bold transition-all duration-300 disabled:opacity-50 cursor-pointer"
							>
								{isSubmitting
									? "Authorizing Transaction..."
									: `Authorize Payment — $${total.toFixed(2)}`}
							</button>
						</div>
					</form>

					{/* Right Column: Order Summary & Review (5 cols) */}
					<div className="lg:col-span-5 border border-white/15 p-6 md:p-8 bg-black/60 backdrop-blur-md sticky top-28 self-start">
						<div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
							<h3 className="font-mono text-xs uppercase tracking-[0.25em] text-[#EDE4DD] font-bold">
								Archive Manifest ({cart.length})
							</h3>
							<Link
								to="/bag"
								className="text-[11px] font-mono uppercase tracking-widest text-zinc-500 hover:text-white underline"
							>
								Edit
							</Link>
						</div>

						{/* Cart Items List */}
						<div className="flex flex-col divide-y divide-white/10 max-h-72 overflow-y-auto pr-1 mb-6">
							{cart.map((item) => (
								<div
									key={item.cartItemId}
									className="py-4 first:pt-0 flex items-center justify-between gap-4"
								>
									<div className="flex items-center gap-4">
										<div className="relative">
											<img
												src={item.primaryImage}
												alt={item.name}
												className="w-14 h-16 object-cover bg-[#141414] border border-white/10"
											/>
											<span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-[#EDE4DD] text-black font-mono text-[10px] font-bold flex items-center justify-center rounded-full">
												{item.quantity}
											</span>
										</div>
										<div>
											<h4 className="text-xs uppercase font-bold tracking-tight text-[#EDE4DD]">
												{item.name}
											</h4>
											{item.size && (
												<p className="text-[10px] font-mono text-zinc-400 mt-0.5">
													SIZE: {item.size}
												</p>
											)}
										</div>
									</div>
									<span className="font-mono text-xs font-bold text-white">
										${(item.price * item.quantity).toFixed(2)}
									</span>
								</div>
							))}
						</div>

						{/* Calculations Breakdown */}
						<div className="border-t border-white/10 pt-4 flex flex-col gap-2.5 font-mono text-xs mb-6">
							<div className="flex justify-between text-zinc-400">
								<span>Subtotal</span>
								<span className="text-white">
									${subtotal.toFixed(2)}
								</span>
							</div>
							<div className="flex justify-between text-zinc-400">
								<span>Shipping</span>
								<span className="text-white">
									{shippingCost === 0
										? "Complimentary"
										: `$${shippingCost.toFixed(2)}`}
								</span>
							</div>
							<div className="flex justify-between text-zinc-400">
								<span>Estimated Tax (8%)</span>
								<span className="text-white">
									${estimatedTax.toFixed(2)}
								</span>
							</div>
							<div className="flex justify-between text-base font-bold text-[#EDE4DD] pt-3 border-t border-white/10">
								<span className="font-mono tracking-wider">TOTAL</span>
								<span>${total.toFixed(2)}</span>
							</div>
						</div>

						{/* Desktop Submit Button */}
						<button
							onClick={handleSubmitOrder}
							type="button"
							disabled={isSubmitting}
							className="hidden lg:block w-full py-4.5 bg-[#EDE4DD] hover:bg-white text-black font-mono uppercase tracking-[0.2em] text-xs font-bold transition-all duration-300 disabled:opacity-50 cursor-pointer active:scale-[0.99]"
						>
							{isSubmitting
								? "Authorizing Transaction..."
								: `Authorize Payment — $${total.toFixed(2)}`}
						</button>

						<div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-center gap-4 text-zinc-500 text-[10px] font-mono tracking-widest uppercase">
							<span>Free 14-day returns</span>
							<span>•</span>
							<span>Authenticity verified</span>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
