import React, { useEffect, useState, useMemo } from "react";

function HeroTitle() {
	const [isLoaded, setIsLoaded] = useState(false);
	const word = "VIBELANE";

	// Pre-set staggered random delays (in ms) for each letter
	const delays = useMemo(() => [150, 420, 220, 520, 300, 180, 480, 360], []);

	useEffect(() => {
		// Triggers shortly after mount/reload
		const timer = setTimeout(() => {
			setIsLoaded(true);
		}, 1000);

		return () => clearTimeout(timer);
	}, []);

	return (
		<div className="w-full px-4 md:px-6 pt-24 md:pt-28 select-none">
			<div className="w-full flex items-center justify-center overflow-hidden">
				<h1
					className="text-[19.8vw] font-black tracking-[-0.02em] leading-[0.80] uppercase text-[#EDE4DD] flex whitespace-nowrap"
					style={{
						fontFamily: "'Inter Tight', -apple-system, sans-serif",
					}}
				>
					{word.split("").map((char, index) => (
						<span key={index} className="inline-block overflow-hidden">
							<span
								className={`inline-block transition-all duration-1400 ease-[cubic-bezier(0.16,1,0.3,1)] ${
									isLoaded
										? "translate-y-0 opacity-100"
										: "translate-y-[115%] opacity-0"
								}`}
								style={{
									transitionDelay: `${delays[index]}ms`,
								}}
							>
								{char}
							</span>
						</span>
					))}
				</h1>
			</div>

			<div
				className={`w-full h-1.25 bg-[#EDE4DD] mt-2 origin-left transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${
					isLoaded ? "scale-x-100" : "scale-x-0"
				}`}
			/>
		</div>
	);
}

export default HeroTitle;
