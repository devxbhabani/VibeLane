import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { fetchAllOrders } from "../services/adminService";
import { getProducts } from "../services/productService";
import {
	TrendingUp,
	// Package,
	ShoppingBag,
	// Clock,
	ArrowUpRight,
	RefreshCw,
	ShieldCheck,
	// CheckCircle2,
	// AlertCircle,
	ArrowRight,
	Layers,
} from "lucide-react";

export default function AdminDashboard() {
	const navigate = useNavigate();
	const [orders, setOrders] = useState([]);
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(true);

	const loadDashboardData = async () => {
		try {
			setLoading(true);
			const [ordersData, productsData] = await Promise.all([
				fetchAllOrders().catch(() => []),
				getProducts().catch(() => []),
			]);
			setOrders(ordersData);
			setProducts(productsData);
		} catch (err) {
			console.error("Failed to load dashboard metrics:", err);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		loadDashboardData();
	}, []);

	// --- Derived Metrics ---
	const totalRevenue = orders.reduce(
		(sum, order) => sum + (Number(order.total) || 0),
		0,
	);

	const statusCounts = orders.reduce((acc, order) => {
		const s = (order.status || "processing").toLowerCase();
		acc[s] = (acc[s] || 0) + 1;
		return acc;
	}, {});

	const uniqueCustomers = new Set(orders.map((o) => o.email?.toLowerCase()))
		.size;

	const recentOrders = orders.slice(0, 5);

	return (
		<div className="min-h-screen bg-black text-[#EDE4DD] selection:bg-[#EDE4DD] selection:text-black font-sans">
			<div className="w-full px-6 md:px-12 pt-32 pb-24 max-w-7xl mx-auto">
				{/* Top Status Header */}
				<div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-white/10">
					<div>
						<div className="flex items-center gap-2.5 text-[11px] font-mono text-[#E11D2A] uppercase tracking-[0.25em] mb-3 font-bold">
							<span className="w-2 h-2 rounded-full bg-[#E11D2A] animate-pulse" />
							OPERATIONS & METRICS
						</div>
						<h1
							className="text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight text-white"
							style={{
								fontFamily: "'Inter Tight', -apple-system, sans-serif",
							}}
						>
							Admin Hub
						</h1>
					</div>

					<div className="flex items-center gap-3">
						<button
							onClick={loadDashboardData}
							disabled={loading}
							className="flex items-center gap-2.5 px-6 py-3.5 bg-transparent hover:bg-white hover:text-black border border-white/20 hover:border-white text-xs font-mono uppercase tracking-[0.2em] font-bold rounded-xs transition-all duration-300 cursor-pointer active:scale-[0.98]"
						>
							<RefreshCw
								className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`}
							/>
							{loading ? "SYNCING..." : "REFRESH METRICS"}
						</button>
					</div>
				</div>

				{/* 4 Core KPI Stat Cards */}
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 my-10">
					{/* Total Revenue */}
					<div className="border border-white/10 bg-[#070707] p-6 rounded-xs relative group hover:border-white/30 transition-all">
						<div className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-3 flex items-center justify-between">
							<span>Gross Acquisitions</span>
							<TrendingUp className="w-4 h-4 text-emerald-400" />
						</div>
						<div className="text-3xl font-black text-white font-mono tracking-tight">
							₹
							{totalRevenue.toLocaleString("en-IN", {
								maximumFractionDigits: 0,
							})}
						</div>
						<div className="text-[10px] font-mono text-zinc-500 mt-2 uppercase tracking-wider">
							Lifetime Gross Volume
						</div>
					</div>

					{/* Total Orders */}
					<div className="border border-white/10 bg-[#070707] p-6 rounded-xs relative group hover:border-white/30 transition-all">
						<div className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-3 flex items-center justify-between">
							<span>Completed Dispatches</span>
							<ShoppingBag className="w-4 h-4 text-zinc-400" />
						</div>
						<div className="text-3xl font-black text-white font-mono tracking-tight">
							{orders.length}
						</div>
						<div className="text-[10px] font-mono text-zinc-500 mt-2 uppercase tracking-wider">
							{statusCounts.processing || 0} In Processing Queue
						</div>
					</div>

					{/* Active Products */}
					<div className="border border-white/10 bg-[#070707] p-6 rounded-xs relative group hover:border-white/30 transition-all">
						<div className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-3 flex items-center justify-between">
							<span>Archive Catalog</span>
							<Layers className="w-4 h-4 text-zinc-400" />
						</div>
						<div className="text-3xl font-black text-white font-mono tracking-tight">
							{products.length}
						</div>
						<div className="text-[10px] font-mono text-zinc-500 mt-2 uppercase tracking-wider">
							Curated Live Pieces
						</div>
					</div>

					{/* Unique Clients */}
					<div className="border border-white/10 bg-[#070707] p-6 rounded-xs relative group hover:border-white/30 transition-all">
						<div className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-3 flex items-center justify-between">
							<span>Client Accounts</span>
							<ShieldCheck className="w-4 h-4 text-purple-400" />
						</div>
						<div className="text-3xl font-black text-white font-mono tracking-tight">
							{uniqueCustomers}
						</div>
						<div className="text-[10px] font-mono text-zinc-500 mt-2 uppercase tracking-wider">
							Verified Purchasing Identities
						</div>
					</div>
				</div>

				{/* Center Stage: Status Breakdown & Fast Actions */}
				<div className="grid grid-cols-1 lg:grid-cols-3 gap-8 my-10">
					{/* Status Pipeline Grid */}
					<div className="lg:col-span-2 border border-white/10 bg-[#070707] p-8 rounded-xs">
						<div className="flex items-center justify-between mb-6 pb-4 border-b border-white/5 font-mono text-xs uppercase tracking-widest text-zinc-400">
							<span>Fulfillment Pipeline Status</span>
							<Link
								to="/admin/orders"
								className="text-white hover:text-[#E11D2A] transition-colors flex items-center gap-1.5"
							>
								<span>Full Order Manifest</span>
								<ArrowRight className="w-3.5 h-3.5" />
							</Link>
						</div>

						<div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
							{[
								{
									key: "pending",
									label: "Pending",
									color: "text-amber-400 border-amber-500/20 bg-amber-500/5",
								},
								{
									key: "processing",
									label: "Processing",
									color: "text-blue-400 border-blue-500/20 bg-blue-500/5",
								},
								{
									key: "shipped",
									label: "Shipped",
									color: "text-purple-400 border-purple-500/20 bg-purple-500/5",
								},
								{
									key: "delivered",
									label: "Delivered",
									color: "text-emerald-400 border-emerald-500/20 bg-emerald-500/5",
								},
								{
									key: "cancelled",
									label: "Cancelled",
									color: "text-red-400 border-red-500/20 bg-red-500/5",
								},
							].map((item) => (
								<div
									key={item.key}
									onClick={() => navigate("/admin/orders")}
									className={`p-4 border rounded-xs cursor-pointer hover:border-white/30 transition-all ${item.color}`}
								>
									<div className="text-2xl font-bold font-mono">
										{statusCounts[item.key] || 0}
									</div>
									<div className="text-[10px] uppercase tracking-wider mt-1 font-mono">
										{item.label}
									</div>
								</div>
							))}
						</div>
					</div>

					{/* Navigation Shortcuts Card */}
					<div className="border border-white/10 bg-[#070707] p-8 rounded-xs flex flex-col justify-between">
						<div>
							<div className="text-xs font-mono uppercase tracking-widest text-zinc-400 mb-6 pb-4 border-b border-white/5">
								Admin Fast Actions
							</div>
							<div className="space-y-3">
								<Link
									to="/admin/orders"
									className="w-full flex items-center justify-between p-4 bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono uppercase tracking-wider text-white transition-all group"
								>
									<span>Manage & Update Orders</span>
									<ArrowUpRight className="w-4 h-4 text-zinc-400 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
								</Link>
								<Link
									to="/"
									className="w-full flex items-center justify-between p-4 bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono uppercase tracking-wider text-white transition-all group"
								>
									<span>Visit Store Front</span>
									<ArrowUpRight className="w-4 h-4 text-zinc-400 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
								</Link>
								<Link
									to="/account"
									className="w-full flex items-center justify-between p-4 bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono uppercase tracking-wider text-white transition-all group"
								>
									<span>Admin Profile</span>
									<ArrowUpRight className="w-4 h-4 text-zinc-400 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
								</Link>
							</div>
						</div>

						<div className="mt-8 pt-4 border-t border-white/5 text-[10px] font-mono text-zinc-600 uppercase tracking-widest">
							SUPERADMINISTRATOR
						</div>
					</div>
				</div>

				{/* Recent 5 Orders Quick Table */}
				<div className="border-t border-white/10 pt-10">
					<div className="flex items-center justify-between mb-6">
						<h3 className="text-xl font-bold uppercase tracking-tight text-white">
							Recent Manifest Entries
						</h3>
						<Link
							to="/admin/orders"
							className="text-xs font-mono uppercase tracking-widest text-zinc-400 hover:text-white transition-colors"
						>
							View All ({orders.length}) →
						</Link>
					</div>

					<div className="border border-white/10 bg-[#070707] rounded-xs overflow-hidden">
						<div className="overflow-x-auto">
							<table className="w-full text-left text-xs font-mono border-collapse">
								<thead>
									<tr className="border-b border-white/10 bg-white/[0.02] text-zinc-500 uppercase tracking-[0.2em] text-[10px]">
										<th className="py-4 px-5">Ref</th>
										<th className="py-4 px-5">Client</th>
										<th className="py-4 px-5">Items</th>
										<th className="py-4 px-5">Amount</th>
										<th className="py-4 px-5">Date</th>
										<th className="py-4 px-5 text-right">Status</th>
									</tr>
								</thead>
								<tbody className="divide-y divide-white/5">
									{loading && recentOrders.length === 0 ? (
										<tr>
											<td
												colSpan="6"
												className="py-12 text-center text-zinc-600"
											>
												Fetching latest transactions...
											</td>
										</tr>
									) : recentOrders.length === 0 ? (
										<tr>
											<td
												colSpan="6"
												className="py-12 text-center text-zinc-600"
											>
												No recent orders found.
											</td>
										</tr>
									) : (
										recentOrders.map((ord) => (
											<tr
												key={ord.id}
												onClick={() => navigate("/admin/orders")}
												className="hover:bg-white/[0.02] cursor-pointer transition-colors"
											>
												<td className="py-4 px-5 font-bold text-white">
													{ord.order_ref || `#${ord.id}`}
												</td>
												<td className="py-4 px-5 text-zinc-300">
													{ord.email}
												</td>
												<td className="py-4 px-5 text-zinc-400">
													{Array.isArray(ord.items)
														? ord.items.length
														: 1}{" "}
													PC(S)
												</td>
												<td className="py-4 px-5 font-bold text-white">
													₹
													{(ord.total || 0).toLocaleString(
														"en-IN",
													)}
												</td>
												<td className="py-4 px-5 text-zinc-500 text-[11px]">
													{new Date(
														ord.created_at,
													).toLocaleDateString("en-GB")}
												</td>
												<td className="py-4 px-5 text-right">
													<span className="inline-block px-2.5 py-1 text-[10px] uppercase tracking-wider font-bold border border-white/15 bg-white/5 text-white rounded-xs">
														{ord.status || "PROCESSING"}
													</span>
												</td>
											</tr>
										))
									)}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
