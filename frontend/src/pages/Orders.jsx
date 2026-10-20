import React, { useState, useEffect } from "react";
import OrdersTitle from "../components/hero/OrdersTitle";
import { useApp } from "../context/AppContext";
import { getUserOrders } from "../services/userService";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Clock, ShieldCheck, ArrowUpRight } from "lucide-react";

// Reusable character-by-character kinetic reveal (matches Bag.jsx)
const AnimatedText = ({ text, isLoaded, baseDelay = 0, className, style }) => {
	return (
		<h1 className={className} style={style}>
			{text.split("").map((char, index) => (
				<span
					key={index}
					className={`inline-block overflow-hidden ${
						char === " " ? "w-[0.28em]" : ""
					}`}
				>
					<span
						className={`inline-block transition-all duration-1200 ease-[cubic-bezier(0.16,1,0.3,1)] ${
							isLoaded
								? "translate-y-0 opacity-100"
								: "translate-y-[115%] opacity-0"
						}`}
						style={{
							transitionDelay: `${baseDelay + index * 35}ms`,
						}}
					>
						{char === " " ? "\u00A0" : char}
					</span>
				</span>
			))}
		</h1>
	);
};

export default function Orders() {
	const navigate = useNavigate();
	const { user } = useApp();
	const [orders, setOrders] = useState([]);
	const [loading, setLoading] = useState(true);
	const [isLoaded, setIsLoaded] = useState(false);

	useEffect(() => {
		if (!user) {
			navigate("/login");
			return;
		}

		const fetchOrders = async () => {
			try {
				const data = await getUserOrders(user.id);
				setOrders(data || []);
			} catch (err) {
				console.error("Failed to load orders:", err);
			} finally {
				setLoading(false);
			}
		};

		fetchOrders();

		const timer = setTimeout(() => {
			setIsLoaded(true);
		}, 1000);

		return () => clearTimeout(timer);
	}, [user, navigate]);

	if (loading) {
		return (
			<div className="min-h-screen pt-36 px-6 text-center font-mono text-xs uppercase tracking-widest text-zinc-500">
				SYNCHRONIZING ACQUISITIONS...
			</div>
		);
	}

	return (
		<div className="min-h-screen overflow-x-hidden selection:bg-[#EDE4DD] selection:text-black pb-24">
			<OrdersTitle />

			<div className="w-full px-6 pt-12">
				{/* Back link to Profile */}
				<Link
					to="/account"
					className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-zinc-500 hover:text-white transition-colors mb-8"
				>
					<ArrowLeft className="w-3.5 h-3.5" />
					Return to Client Identity
				</Link>

				{orders.length === 0 ? (
					/* Empty Orders state mirroring Bag empty state */
					<div className="flex flex-col gap-3 pt-6">
						<AnimatedText
							text="No Pieces Yet?"
							isLoaded={isLoaded}
							baseDelay={100}
							className="text-8xl md:text-9xl font-extrabold flex flex-wrap text-white"
							style={{
								fontFamily: "'Inter Tight', -apple-system, sans-serif",
							}}
						/>
						<AnimatedText
							text="Archive Empty."
							isLoaded={isLoaded}
							baseDelay={650}
							className="text-8xl md:text-9xl text-zinc-500 font-extrabold flex flex-wrap"
							style={{
								fontFamily: "'Inter Tight', -apple-system, sans-serif",
							}}
						/>
						<div className="pt-8">
							<Link
								to="/"
								className="inline-block px-8 py-4 bg-[#EDE4DD] hover:bg-white text-black font-mono uppercase tracking-widest text-xs font-bold transition-all duration-300"
							>
								Explore Archive Collection
							</Link>
						</div>
					</div>
				) : (
					/* Orders List formatted identically to Bag items */
					<div className="flex flex-col divide-y divide-white/10 max-w-6xl">
						{orders.map((order, orderIdx) => {
							const formattedDate = new Date(
								order.created_at,
							).toLocaleDateString(undefined, {
								year: "numeric",
								month: "short",
								day: "numeric",
							});

							const itemsList = Array.isArray(order.items)
								? order.items
								: [];

							return (
								<div
									key={order.id || order.order_ref}
									className={`py-10 flex flex-col gap-6 transition-all duration-1400 ease-[cubic-bezier(0.16,1,0.3,1)] ${
										isLoaded
											? "translate-y-0 opacity-100"
											: "translate-y-14 opacity-0"
									}`}
									style={{
										transitionDelay: `${200 + orderIdx * 140}ms`,
									}}
								>
									{/* Order Meta Header Bar */}
									<div className="flex flex-wrap items-center justify-between gap-4 font-mono text-xs">
										<div className="flex items-center gap-4">
											<span className="text-[10px] uppercase tracking-widest text-zinc-500">
												MANIFEST
											</span>
											<span className="text-base font-bold text-[#EDE4DD] tracking-wider">
												{order.order_ref}
											</span>
											<span className="px-2 py-0.5 text-[10px] font-bold uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
												{order.status || "CONFIRMED"}
											</span>
										</div>

										<div className="flex items-center gap-6 text-zinc-400">
											<span>{formattedDate}</span>
											<span>•</span>
											<span className="uppercase text-[11px]">
												PAYMENT:{" "}
												<strong className="text-white">
													{order.payment_method || "CARD"}
												</strong>
											</span>
											<span>•</span>
											<span className="text-base font-bold text-white">
												${Number(order.total).toFixed(2)}
											</span>
										</div>
									</div>

									{/* List of items in this order styled exactly like Bag.jsx items */}
									<div className="flex flex-col divide-y divide-white/5 pl-2 md:pl-4">
										{itemsList.map((item, itemIdx) => (
											<div
												key={itemIdx}
												className="py-4 flex items-center justify-between gap-6"
											>
												<div
													className="flex items-center gap-6 cursor-pointer group"
													onClick={() =>
														item.slug && navigate(`/products/${item.slug}`)
													}
												>
													<img
														src={item.primaryImage}
														alt={item.name}
														className="w-16 h-20 md:w-20 md:h-24 object-cover rounded-xs bg-[#141414] border border-white/10"
													/>
													<div>
														<h4 className="text-base md:text-lg font-bold uppercase tracking-tight text-[#EDE4DD] group-hover:text-white transition-colors flex items-center gap-1.5">
															<span>{item.name}</span>
															{item.slug && (
																<ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
															)}
														</h4>
														<div className="text-xs font-mono text-zinc-400 mt-1 flex gap-4">
															{item.size && (
																<span>
																	SIZE:{" "}
																	<strong className="text-white">
																		{item.size}
																	</strong>
																</span>
															)}
															<span>
																QTY:{" "}
																<strong className="text-white">
																	{item.quantity}
																</strong>
															</span>
														</div>
													</div>
												</div>

												<div className="font-mono text-base font-bold text-white">
													${(item.price * item.quantity).toFixed(2)}
												</div>
											</div>
										))}
									</div>
								</div>
							);
						})}
					</div>
				)}
			</div>
		</div>
	);
}
