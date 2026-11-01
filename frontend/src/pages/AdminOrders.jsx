import React, { useState, useEffect } from "react";
import { fetchAllOrders, updateOrderStatusApi } from "../services/adminService";
import { Search, RefreshCw, ChevronDown } from "lucide-react";

const STATUS_CONFIG = {
	pending: {
		label: "Pending",
		badge: "text-amber-400 bg-amber-500/10 border-amber-500/30",
	},
	processing: {
		label: "Processing",
		badge: "text-blue-400 bg-blue-500/10 border-blue-500/30",
	},
	shipped: {
		label: "Shipped",
		badge: "text-purple-400 bg-purple-500/10 border-purple-500/30",
	},
	delivered: {
		label: "Delivered",
		badge: "text-emerald-400 bg-emerald-500/10 border-emerald-500/30",
	},
	cancelled: {
		label: "Cancelled",
		badge: "text-red-400 bg-red-500/10 border-red-500/30",
	},
};

export default function AdminOrders() {
	const [orders, setOrders] = useState([]);
	const [loading, setLoading] = useState(true);
	const [updatingId, setUpdatingId] = useState(null);
	const [searchQuery, setSearchQuery] = useState("");
	const [statusFilter, setStatusFilter] = useState("all");
	const [feedbackMsg, setFeedbackMsg] = useState("");

	const loadOrders = async () => {
		try {
			setLoading(true);
			const data = await fetchAllOrders();
			setOrders(data);
		} catch (err) {
			console.error("Error loading orders:", err);
			setFeedbackMsg("Failed to load orders");
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		loadOrders();
	}, []);

	const handleStatusUpdate = async (orderId, newStatus) => {
		try {
			setUpdatingId(orderId);
			await updateOrderStatusApi(orderId, newStatus);

			setOrders((prev) =>
				prev.map((o) =>
					o.id === orderId ? { ...o, status: newStatus } : o,
				),
			);
			setFeedbackMsg(`ORDER #${orderId} SET TO ${newStatus.toUpperCase()}`);
			setTimeout(() => setFeedbackMsg(""), 3500);
		} catch (err) {
			alert(err.message || "Could not update status");
		} finally {
			setUpdatingId(null);
		}
	};

	const filteredOrders = orders.filter((order) => {
		const matchesSearch =
			(order.order_ref || "")
				.toLowerCase()
				.includes(searchQuery.toLowerCase()) ||
			(order.email || "")
				.toLowerCase()
				.includes(searchQuery.toLowerCase()) ||
			(order.id || "").toString().includes(searchQuery);

		const matchesStatus =
			statusFilter === "all" ||
			(order.status || "processing").toLowerCase() ===
				statusFilter.toLowerCase();

		return matchesSearch && matchesStatus;
	});

	return (
		<div className="min-h-screen bg-black text-[#EDE4DD] selection:bg-[#EDE4DD] selection:text-black">
			{/* Edge-to-edge container matching Bag & Orders pages */}
			<div className="w-full px-6 md:px-12 pt-32 pb-24">
				{/* Top Header */}
				<div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-white/10">
					<div>
						<div className="flex items-center gap-2.5 text-[11px] font-mono text-[#E11D2A] uppercase tracking-[0.25em] mb-3 font-bold">
							<span className="w-2 h-2 rounded-full bg-[#E11D2A] animate-pulse" />
							SYSTEM ADMINISTRATION
						</div>
						<h1
							className="text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight text-white"
							style={{
								fontFamily: "'Inter Tight', -apple-system, sans-serif",
							}}
						>
							Order Manager
						</h1>
					</div>

					<div className="flex items-center gap-3">
						<button
							onClick={loadOrders}
							disabled={loading}
							className="flex items-center gap-2.5 px-6 py-3.5 bg-transparent hover:bg-white hover:text-black border border-white/20 hover:border-white text-xs font-mono uppercase tracking-[0.2em] font-bold rounded-xs transition-all duration-300 cursor-pointer active:scale-[0.98]"
						>
							<RefreshCw
								className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`}
							/>
							{loading ? "SYNCHRONIZING..." : "REFRESH ARCHIVE"}
						</button>
					</div>
				</div>

				{/* Feedback Toast */}
				{feedbackMsg && (
					<div className="mt-6 p-4 bg-white/5 border border-white/15 text-white text-xs font-mono uppercase tracking-widest flex items-center justify-between">
						<span>{feedbackMsg}</span>
						<button
							onClick={() => setFeedbackMsg("")}
							className="text-zinc-400 hover:text-white"
						>
							✕
						</button>
					</div>
				)}

				{/* Filter & Search Bar - Pure Black with sleek border */}
				<div className="flex flex-col sm:flex-row items-stretch gap-4 my-10">
					<div className="relative flex-1">
						<Search className="w-4 h-4 text-zinc-500 absolute left-4 top-1/2 -translate-y-1/2" />
						<input
							type="text"
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
							placeholder="Search by order ref, email, or order ID..."
							className="w-full pl-11 pr-4 py-3.5 bg-black border border-white/15 hover:border-white/30 focus:border-white text-xs font-mono text-white placeholder-zinc-600 focus:outline-none transition-colors"
						/>
					</div>

					<div className="relative w-full sm:w-64">
						<select
							value={statusFilter}
							onChange={(e) => setStatusFilter(e.target.value)}
							className="w-full py-3.5 pl-4 pr-10 bg-black border border-white/15 hover:border-white/30 focus:border-white text-xs font-mono text-[#EDE4DD] focus:outline-none transition-colors cursor-pointer appearance-none uppercase tracking-wider"
						>
							<option value="all" className="bg-black text-white">
								All Statuses ({orders.length})
							</option>
							<option value="pending" className="bg-black text-white">
								Pending
							</option>
							<option value="processing" className="bg-black text-white">
								Processing
							</option>
							<option value="shipped" className="bg-black text-white">
								Shipped
							</option>
							<option value="delivered" className="bg-black text-white">
								Delivered
							</option>
							<option value="cancelled" className="bg-black text-white">
								Cancelled
							</option>
						</select>
						<ChevronDown className="w-4 h-4 text-zinc-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
					</div>
				</div>

				{/* Orders Table - Seamless Pure Black Design */}
				<div className="border-t border-b border-white/10 w-full overflow-hidden">
					<div className="overflow-x-auto">
						<table className="w-full text-left text-xs font-mono border-collapse">
							<thead>
								<tr className="border-b border-white/10 text-zinc-500 uppercase tracking-[0.2em] text-[10px]">
									<th className="py-4 px-4 font-semibold">
										Order Ref
									</th>
									<th className="py-4 px-4 font-semibold">
										Client Identity
									</th>
									<th className="py-4 px-4 font-semibold">Items</th>
									<th className="py-4 px-4 font-semibold">
										Total Amount
									</th>
									<th className="py-4 px-4 font-semibold">
										Timestamp
									</th>
									<th className="py-4 px-4 font-semibold text-right">
										Order Status Control
									</th>
								</tr>
							</thead>
							<tbody className="divide-y divide-white/5">
								{loading && orders.length === 0 ? (
									<tr>
										<td
											colSpan="6"
											className="py-20 text-center text-zinc-600 font-mono text-xs uppercase tracking-widest"
										>
											Synchronizing records with database...
										</td>
									</tr>
								) : filteredOrders.length === 0 ? (
									<tr>
										<td
											colSpan="6"
											className="py-20 text-center text-zinc-600 font-mono text-xs uppercase tracking-widest"
										>
											No matching records found in archive.
										</td>
									</tr>
								) : (
									filteredOrders.map((order) => {
										const statusKey = (
											order.status || "processing"
										).toLowerCase();
										const badgeInfo =
											STATUS_CONFIG[statusKey] ||
											STATUS_CONFIG.processing;

										return (
											<tr
												key={order.id}
												className="hover:bg-white/[0.02] transition-colors"
											>
												{/* Order Reference */}
												<td className="py-6 px-4">
													<span className="font-bold text-white tracking-wider block text-base">
														{order.order_ref || `#${order.id}`}
													</span>
													<span className="text-[10px] text-zinc-500 uppercase tracking-widest block mt-1">
														GATEWAY:{" "}
														{order.payment_method || "UPI"}
													</span>
												</td>

												{/* Client Identity */}
												<td className="py-6 px-4">
													<span className="text-zinc-200 block text-xs">
														{order.email}
													</span>
													<span className="text-[10px] text-zinc-500 font-mono block mt-1">
														{order.shipping_address?.phone ||
															order.shipping_address?.city ||
															"Verified Customer"}
													</span>
												</td>

												{/* Items */}
												<td className="py-6 px-4 text-zinc-400">
													<span className="px-2.5 py-1 border border-white/10 rounded-xs text-[11px] text-zinc-300">
														{Array.isArray(order.items)
															? `${order.items.length} PC(S)`
															: "1 PC"}
													</span>
												</td>

												{/* Total */}
												<td className="py-6 px-4 font-bold text-white text-base">
													₹
													{(order.total || 0).toLocaleString(
														"en-IN",
													)}
												</td>

												{/* Date */}
												<td className="py-6 px-4 text-zinc-500 text-[11px]">
													{new Date(
														order.created_at,
													).toLocaleDateString("en-GB", {
														day: "2-digit",
														month: "short",
														year: "numeric",
													})}
												</td>

												{/* Status Action Controller */}
												<td className="py-6 px-4 text-right">
													<div className="inline-flex items-center justify-end">
														<div className="relative inline-block">
															<select
																disabled={
																	updatingId === order.id
																}
																value={statusKey}
																onChange={(e) =>
																	handleStatusUpdate(
																		order.id,
																		e.target.value,
																	)
																}
																className={`appearance-none cursor-pointer py-2 pl-3.5 pr-8 text-xs font-mono font-bold uppercase tracking-[0.15em] rounded-xs border transition-all focus:outline-none focus:ring-1 focus:ring-white/40 disabled:opacity-50 ${badgeInfo.badge}`}
															>
																<option
																	value="pending"
																	className="bg-black text-amber-400"
																>
																	PENDING
																</option>
																<option
																	value="processing"
																	className="bg-black text-blue-400"
																>
																	PROCESSING
																</option>
																<option
																	value="shipped"
																	className="bg-black text-purple-400"
																>
																	SHIPPED
																</option>
																<option
																	value="delivered"
																	className="bg-black text-emerald-400"
																>
																	DELIVERED
																</option>
																<option
																	value="cancelled"
																	className="bg-black text-red-400"
																>
																	CANCELLED
																</option>
															</select>
															<ChevronDown className="w-3.5 h-3.5 text-zinc-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
														</div>
													</div>
												</td>
											</tr>
										);
									})
								)}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	);
}
