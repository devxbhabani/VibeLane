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

	// Ultra-smooth image flip interval
	useEffect(() => {
		const imgInterval = setInterval(() => {
			setActiveImgIndex((prev) => (prev + 1) % SPLASH_IMAGES.length);
		}, 180);

		return () => clearInterval(imgInterval);
	}, []);

	// Smooth counter animation from 000 to 100
	useEffect(() => {
		let current = 0;
		const interval = setInterval(() => {
			const step = Math.floor(Math.random() * 3) + 2; // steady smooth increments
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
				}, 400);
			}
		}, 38);

		return () => clearInterval(interval);
	}, [onComplete]);

	if (hidden) return null;

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
				{/* Dark Crimson Rotated Card Layer 1 */}
				<div
					className="absolute w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 bg-[#160507] border border-[#E11D2A]/30 transition-transform duration-700 ease-out shadow-[0_0_50px_rgba(225,29,42,0.15)]"
					style={{
						transform: `rotate(${activeImgIndex % 2 === 0 ? "12deg" : "16deg"}) scale(${
							1 + (counter / 100) * 0.05
						})`,
					}}
				/>

				{/* Vibrant Deep Red Rotated Card Layer 2 */}
				<div
					className="absolute w-56 h-56 sm:w-68 sm:h-68 md:w-76 md:h-76 bg-[#8A0F17] transition-transform duration-700 ease-out shadow-2xl opacity-90"
					style={{
						transform: `rotate(${activeImgIndex % 2 === 0 ? "-8deg" : "-12deg"})`,
					}}
				/>

				{/* Physical Layered Photo Stack */}
				<div className="relative z-10 w-48 h-60 sm:w-56 sm:h-72 md:w-64 md:h-80 flex items-center justify-center">
					{/* Under card 2 */}
					<div
						className="absolute w-44 h-56 sm:w-52 sm:h-64 md:w-56 md:h-72 bg-[#181818] border border-white/10 shadow-2xl transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
						style={{
							transform: `rotate(${activeImgIndex % 2 === 0 ? "6deg" : "-6deg"}) translate(${
								activeImgIndex % 2 === 0 ? "8px" : "-8px"
							}, 4px)`,
						}}
					/>

					{/* Under card 1 */}
					<div
						className="absolute w-44 h-56 sm:w-52 sm:h-64 md:w-56 md:h-72 bg-[#141414] border border-white/10 shadow-2xl transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
						style={{
							transform: `rotate(${activeImgIndex % 2 === 0 ? "-4deg" : "4deg"}) translate(${
								activeImgIndex % 2 === 0 ? "-6px" : "6px"
							}, -2px)`,
						}}
					/>

					{/* Active Top Card Container */}
					<div
						className="relative w-44 h-56 sm:w-52 sm:h-64 md:w-56 md:h-72 overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.95)] bg-[#101010] border border-white/25 transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
						style={{
							transform: `rotate(${activeImgIndex % 2 === 0 ? "-1.5deg" : "1.5deg"})`,
						}}
					>
						{SPLASH_IMAGES.map((imgSrc, idx) => (
							<img
								key={idx}
								src={imgSrc}
								alt="VibeLane Silhouette"
								className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ease-in-out ${
									idx === activeImgIndex ? "opacity-100 scale-100" : "opacity-0 scale-102"
								}`}
							/>
						))}
					</div>
				</div>

				{/* Giant Centered "VIBELANE" Typography overlapping cards in bold dark-mode palette */}
				<h1
					className="absolute z-20 pointer-events-none text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black uppercase tracking-[-0.03em] leading-none text-white/95 drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)]"
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
