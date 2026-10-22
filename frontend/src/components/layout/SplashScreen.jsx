import React, { useState, useEffect } from "react";

export default function SplashScreen({ onComplete }) {
	const [counter, setCounter] = useState(0);
	const [statusIndex, setStatusIndex] = useState(0);
	const [isExiting, setIsExiting] = useState(false);
	const [hidden, setHidden] = useState(false);

	const statuses = [
		"INIT ARCHIVE PROTOCOL",
		"CURATING SILHOUETTES",
		"INDEXING LUXURY SYSTEM",
		"AUTHENTICATING STUDIO 26",
		"ACCESS AUTHORIZED",
	];

	useEffect(() => {
		// Realistic non-linear progress counter matching ++hellohello / Awwwards loaders
		let current = 0;
		const interval = setInterval(() => {
			// Jump by variable steps to give authentic kinetic feeling
			const increment = Math.floor(Math.random() * 6) + 2;
			current = Math.min(100, current + increment);
			setCounter(current);

			// Synchronize status text based on percentage bracket
			if (current < 25) setStatusIndex(0);
			else if (current < 55) setStatusIndex(1);
			else if (current < 80) setStatusIndex(2);
			else if (current < 98) setStatusIndex(3);
			else setStatusIndex(4);

			if (current >= 100) {
				clearInterval(interval);
				// Slight pause at 100% before triggering editorial slide-up reveal
				setTimeout(() => {
					setIsExiting(true);
					setTimeout(() => {
						setHidden(true);
						if (onComplete) onComplete();
					}, 1100); // Wait for transition duration
				}, 450);
			}
		}, 38);

		return () => clearInterval(interval);
	}, [onComplete]);

	if (hidden) return null;

	return (
		<div
			className={`fixed inset-0 z-[9999] flex flex-col justify-between bg-black text-[#EDE4DD] select-none transition-transform duration-1100 ease-[cubic-bezier(0.76,0,0.24,1)] ${
				isExiting ? "-translate-y-full" : "translate-y-0"
			}`}
		>
			{/* Top Bar: Brand & Session Metadata */}
			<div className="w-full px-6 md:px-12 pt-8 flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.25em] text-zinc-500 border-b border-white/5 pb-4">
				<div className="flex items-center gap-2">
					<span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
					<span className="text-white font-bold tracking-widest">
						VIBELANE
					</span>
					<span className="hidden sm:inline text-zinc-600">
						// ARCHIVE STOREFRONT
					</span>
				</div>
				<div className="flex items-center gap-6">
					<span className="hidden md:inline">22.57° N / 88.36° E</span>
					<span>©2026 EDITION</span>
				</div>
			</div>

			{/* Center: Monumental Kinetic Typography & Percentage */}
			<div className="w-full px-6 md:px-12 flex flex-col items-start justify-center my-auto">
				{/* Editorial Micro-Label */}
				<div className="overflow-hidden mb-2">
					<p
						className="font-mono text-xs md:text-sm uppercase tracking-[0.3em] text-zinc-400 transition-all duration-300"
						style={{
							fontFamily: "'Inter Tight', -apple-system, sans-serif",
						}}
					>
						[ {statuses[statusIndex]} ]
					</p>
				</div>

				{/* Massive Counter Digits */}
				<div className="overflow-hidden w-full">
					<h1
						className="text-[23vw] md:text-[20vw] font-black uppercase tracking-[-0.04em] leading-[0.78] text-[#EDE4DD] flex items-baseline justify-between w-full"
						style={{
							fontFamily: "'Inter Tight', -apple-system, sans-serif",
						}}
					>
						<span>{String(counter).padStart(2, "0")}</span>
						<span className="text-[9vw] font-light text-zinc-600 tracking-normal">
							%
						</span>
					</h1>
				</div>
			</div>

			{/* Bottom Bar: Horizontal Progress Line & Architecture Info */}
			<div className="w-full px-6 md:px-12 pb-8 flex flex-col gap-4 font-mono text-xs uppercase tracking-widest">
				{/* Kinetic Line Progress */}
				<div className="w-full h-[2px] bg-white/10 overflow-hidden relative">
					<div
						className="h-full bg-[#EDE4DD] transition-all duration-150 ease-out origin-left"
						style={{ width: `${counter}%` }}
					/>
				</div>

				{/* Bottom details */}
				<div className="flex items-center justify-between text-[10px] md:text-[11px] text-zinc-500">
					<span>FASHION • ARTIFACTS • SILHOUETTES</span>
					<span className="text-zinc-400">
						PRELOADING ENGINE // {counter}%
					</span>
				</div>
			</div>
		</div>
	);
}
