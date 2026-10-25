import React, { useState, useEffect } from "react";

const SPLASH_IMAGES = [
	"/images/products/outfit_01_off-by-design_primary.jpg",
	"/images/products/outfit_02_kerned-confidence-1_primary.jpg",
	"/images/products/outfit_03_specimen-no-hh01_primary.jpg",
	"/images/products/outfit_04_grid-system-go_primary.jpg",
	"/images/products/outfit_06_red-dot-not-award-1_primary.jpg",
	"/images/products/outfit_08_hello-week-001_primary.jpg",
	"/images/products/outfit_10_monochrome-manifest-1_primary.jpg",
	"/images/products/outfit_13_command-k_primary.jpg",
];

export default function SplashScreen({ onComplete }) {
	const [counter, setCounter] = useState(0);
	const [activeImgIndex, setActiveImgIndex] = useState(0);
	const [isExiting, setIsExiting] = useState(false);
	const [hidden, setHidden] = useState(false);

	// Preload all splash images so there is zero stutter or blank frames
	useEffect(() => {
		SPLASH_IMAGES.forEach((src) => {
			const img = new Image();
			img.src = src;
		});
	}, []);

	// Smooth card shuffle interval
	useEffect(() => {
		const imgInterval = setInterval(() => {
			setActiveImgIndex((prev) => (prev + 1) % SPLASH_IMAGES.length);
		}, 340);

		return () => clearInterval(imgInterval);
	}, []);

	// Smooth counter animation from 000 to 100
	useEffect(() => {
		let current = 0;
		const interval = setInterval(() => {
			const step = Math.floor(Math.random() * 2) + 1; // consistent smooth cadence
			current = Math.min(100, current + step);
			setCounter(current);

			if (current >= 100) {
				clearInterval(interval);

				// Brief pause at 100% then curtain smoothly lifts directly into the homepage
				setTimeout(() => {
					setIsExiting(true);

					setTimeout(() => {
						setHidden(true);
						if (onComplete) onComplete();
					}, 950);
				}, 450);
			}
		}, 32);

		return () => clearInterval(interval);
	}, [onComplete]);

	if (hidden) return null;

	// Deterministic slight angle offset for stacked look based on index
	const angles = [-4, 3.5, -2, 5, -3.5, 2, -5, 4];
	const currentAngle = angles[activeImgIndex % angles.length];

	// Derive the 3 visible layered cards (top, middle, bottom)
	const topIdx = activeImgIndex;
	const midIdx = (activeImgIndex - 1 + SPLASH_IMAGES.length) % SPLASH_IMAGES.length;
	const botIdx = (activeImgIndex - 2 + SPLASH_IMAGES.length) % SPLASH_IMAGES.length;

	return (
		<div
			className={`fixed inset-0 z-[9999] select-none bg-[#0a0a0a] text-[#EDE4DD] flex flex-col justify-between overflow-hidden transition-transform duration-950 ease-[cubic-bezier(0.85,0,0.15,1)] ${
				isExiting ? "-translate-y-full" : "translate-y-0"
			}`}
		>
			{/* Top Bar: Minimal Dark Luxury Branding */}
			<div className="w-full px-6 md:px-12 pt-8 flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.25em] text-zinc-500 border-b border-white/5 pb-4">
				<div className="flex items-center gap-2">
					<span className="w-2 h-2 rounded-full bg-[#E11D2A] animate-pulse" />
					<span className="text-[#EDE4DD] font-bold tracking-widest">
						VIBELANE
					</span>
				</div>
				<div />
			</div>

			{/* Center Stage: Dark Card Stack + Smooth Photo Rotations */}
			<div className="relative w-full flex-1 flex items-center justify-center">
				{/* Dark Crimson Rotated Glow Backdrop Layer */}
				<div
					className="absolute w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 bg-[#1a0507] border border-[#E11D2A]/25 transition-transform duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] shadow-[0_0_60px_rgba(225,29,42,0.18)]"
					style={{
						transform: `rotate(${currentAngle * 2.2}deg) scale(${
							1 + (counter / 100) * 0.04
						})`,
					}}
				/>

				{/* Vibrant Deep Crimson Accent Square */}
				<div
					className="absolute w-56 h-56 sm:w-64 sm:h-64 md:w-72 md:h-72 bg-[#700B12]/80 transition-transform duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] shadow-2xl"
					style={{
						transform: `rotate(${-currentAngle * 1.8}deg)`,
					}}
				/>

				{/* Physical Layered Photo Stack of 3 actual photos */}
				<div className="relative z-10 w-48 h-60 sm:w-56 sm:h-72 md:w-64 md:h-80 flex items-center justify-center">
					{/* Bottom Layer Photo */}
					<div
						className="absolute w-44 h-56 sm:w-52 sm:h-64 md:w-56 md:h-72 overflow-hidden rounded-sm bg-[#121212] border border-white/10 shadow-2xl transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
						style={{
							transform: `rotate(${-currentAngle * 1.2}deg) translate(${currentAngle * 2}px, 6px) scale(0.92)`,
							filter: "brightness(0.65) contrast(1.1)",
						}}
					>
						<img
							src={SPLASH_IMAGES[botIdx]}
							alt=""
							className="w-full h-full object-cover"
						/>
						<div className="absolute inset-0 bg-black/40" />
					</div>

					{/* Middle Layer Photo */}
					<div
						className="absolute w-44 h-56 sm:w-52 sm:h-64 md:w-56 md:h-72 overflow-hidden rounded-sm bg-[#151515] border border-white/15 shadow-2xl transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
						style={{
							transform: `rotate(${currentAngle * 1.1}deg) translate(${-currentAngle * 1.5}px, 2px) scale(0.96)`,
							filter: "brightness(0.85)",
						}}
					>
						<img
							src={SPLASH_IMAGES[midIdx]}
							alt=""
							className="w-full h-full object-cover"
						/>
						<div className="absolute inset-0 bg-black/20" />
					</div>

					{/* Active Top Layer Photo */}
					<div
						className="relative z-10 w-44 h-56 sm:w-52 sm:h-64 md:w-56 md:h-72 overflow-hidden rounded-sm bg-[#1c1c1c] border border-white/25 shadow-[0_25px_60px_rgba(0,0,0,0.95)] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
						style={{
							transform: `rotate(${currentAngle * 0.5}deg) scale(1)`,
						}}
					>
						{SPLASH_IMAGES.map((imgSrc, idx) => (
							<img
								key={idx}
								src={imgSrc}
								alt="VibeLane Collection"
								className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ease-in-out ${
									idx === topIdx ? "opacity-100" : "opacity-0 pointer-events-none"
								}`}
							/>
						))}
					</div>
				</div>

				{/* Giant Centered "VIBELANE" Typography overlapping cards in bold dark-mode palette */}
				<h1
					className="absolute z-20 pointer-events-none text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black uppercase tracking-[-0.03em] leading-none text-white/95 drop-shadow-[0_10px_35px_rgba(0,0,0,0.9)]"
					style={{
						fontFamily: "'Inter Tight', -apple-system, sans-serif",
					}}
				>
					VIBELANE
				</h1>

				{/* 3-Digit Counter on the Right side (e.g. 036, 095, 100) */}
				<div className="absolute right-8 md:right-24 lg:right-36 top-1/2 -translate-y-1/2 z-20 font-mono text-sm sm:text-base md:text-xl tracking-widest text-[#E11D2A] font-bold">
					{String(counter).padStart(3, "0")}
				</div>

				{/* Minimalist studio marks at the bottom of the card */}
				<div className="absolute z-20 bottom-8 font-mono text-xs text-zinc-500 tracking-widest uppercase flex items-center gap-2">
					<span className="text-[#E11D2A] font-bold">++</span>
					<span>AUTONOMOUS ARCHIVE CURATION</span>
				</div>
			</div>

			{/* Bottom Bar: Progress Indicator */}
			<div className="w-full px-6 md:px-12 pb-8 flex items-center justify-center font-mono text-xs text-zinc-500 uppercase tracking-widest border-t border-white/5 pt-4">
				<div className="w-48 h-1 bg-white/10 overflow-hidden relative rounded-full">
					<div
						className="h-full bg-[#E11D2A] transition-all duration-150 ease-out origin-left"
						style={{ width: `${counter}%` }}
					/>
				</div>
			</div>
		</div>
	);
}
