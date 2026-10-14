import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ShoppingBag, ArrowUpRight, Menu, X } from "lucide-react";
import { useApp } from "../../context/AppContext";

export const Navbar = () => {
	const [scrolled, setScrolled] = useState(false);
	const [mobileOpen, setMobileOpen] = useState(false);
	const location = useLocation();
	const { cart } = useApp();

	const cartItemCount = Array.isArray(cart)
		? cart.reduce((total, item) => total + (item.quantity || 1), 0)
		: 0;

	useEffect(() => {
		const handleScroll = () => {
			setScrolled(window.scrollY > 40);
		};

		window.addEventListener("scroll", handleScroll, { passive: true });
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	// Close mobile menu on route change
	useEffect(() => {
		setMobileOpen(false);
	}, [location.pathname]);

	const linkStyle =
		"relative text-[11px] font-mono uppercase tracking-[0.2em] text-[#EDE4DD]/70 hover:text-[#EDE4DD] transition-colors duration-200 after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[1px] after:w-0 after:bg-[#EDE4DD] after:transition-all after:duration-300 hover:after:w-full";

	return (
		<header
			className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
				scrolled
					? "bg-black/60 backdrop-blur-md border-b border-white/10 py-3.5"
					: "bg-transparent border-b border-transparent py-5"
			}`}
		>
			<div className="w-full px-6 md:px-10 flex items-center justify-between">
				{/* Left: Brand Identity */}
				<div className="flex items-center gap-6">
					<Link
						to="/"
						className="group flex items-baseline gap-2.5 cursor-pointer select-none"
					>
						<span
							className="text-xl md:text-2xl font-black tracking-[-0.03em] uppercase text-[#EDE4DD] transition-transform duration-300 group-hover:scale-[1.02]"
							style={{ fontFamily: "'Inter Tight', -apple-system, sans-serif" }}
						>
							VIBELANE
						</span>
						<span className="hidden sm:inline-block text-[10px] font-mono tracking-widest text-zinc-500 uppercase">
							STUDIO ©26
						</span>
					</Link>
				</div>

				{/* Center: Navigation Links (Desktop) */}
				<nav className="hidden md:flex items-center gap-8">
					<Link to="/" className={linkStyle}>
						Archive
					</Link>
					<a href="/#lookbook" className={linkStyle}>
						Lookbook
					</a>
					<Link to="/privacy" className={linkStyle}>
						Protocol
					</Link>
					<Link to="/terms" className={linkStyle}>
						Legal
					</Link>
				</nav>

				{/* Right: Actions (Cart & Quick Actions) */}
				<div className="flex items-center gap-4 md:gap-6">
					<div className="hidden lg:flex items-center gap-2 text-[11px] font-mono text-zinc-500 uppercase tracking-widest">
						<span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
						<span>22.57° N / 88.36° E</span>
					</div>

					<button
						type="button"
						className="group relative flex items-center gap-2 px-3.5 py-1.5 rounded-xs border border-white/15 bg-white/5 hover:bg-[#EDE4DD] hover:text-black text-[#EDE4DD] text-[11px] font-mono tracking-widest uppercase transition-all duration-300 cursor-pointer"
						aria-label="View Shopping Bag"
					>
						<ShoppingBag className="w-3.5 h-3.5 transition-transform duration-300 group-hover:scale-110" />
						<span className="hidden sm:inline font-medium">Bag</span>
						<span className="text-[10px] px-1 py-0.2 rounded-xs bg-white/10 group-hover:bg-black/10 font-bold">
							[{cartItemCount}]
						</span>
					</button>

					{/* Mobile Menu Toggle */}
					<button
						type="button"
						onClick={() => setMobileOpen((prev) => !prev)}
						className="md:hidden p-1.5 text-[#EDE4DD]/80 hover:text-[#EDE4DD] cursor-pointer"
						aria-label="Toggle navigation menu"
					>
						{mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
					</button>
				</div>
			</div>

			{/* Mobile Dropdown Panel */}
			<div
				className={`md:hidden overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
					mobileOpen
						? "max-h-80 bg-black/95 backdrop-blur-xl border-b border-white/10 mt-3 px-6 py-6"
						: "max-h-0 py-0"
				}`}
			>
				<nav className="flex flex-col gap-4 font-mono text-xs uppercase tracking-widest">
					<Link
						to="/"
						className="text-[#EDE4DD] hover:text-zinc-400 flex items-center justify-between py-1 border-b border-white/5"
					>
						<span>Archive</span>
						<ArrowUpRight className="w-3.5 h-3.5 opacity-50" />
					</Link>
					<a
						href="/#lookbook"
						onClick={() => setMobileOpen(false)}
						className="text-[#EDE4DD] hover:text-zinc-400 flex items-center justify-between py-1 border-b border-white/5"
					>
						<span>Lookbook</span>
						<ArrowUpRight className="w-3.5 h-3.5 opacity-50" />
					</a>
					<Link
						to="/privacy"
						className="text-[#EDE4DD] hover:text-zinc-400 flex items-center justify-between py-1 border-b border-white/5"
					>
						<span>Privacy Protocol</span>
						<ArrowUpRight className="w-3.5 h-3.5 opacity-50" />
					</Link>
					<Link
						to="/terms"
						className="text-[#EDE4DD] hover:text-zinc-400 flex items-center justify-between py-1 border-b border-white/5"
					>
						<span>Terms & Conditions</span>
						<ArrowUpRight className="w-3.5 h-3.5 opacity-50" />
					</Link>
				</nav>

				<div className="mt-6 pt-4 border-t border-white/10 flex justify-between items-center text-[10px] font-mono text-zinc-500">
					<span>KOLKATA, WB — IN</span>
					<span>EST. 2026</span>
				</div>
			</div>
		</header>
	);
};

export default Navbar;
