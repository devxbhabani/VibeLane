import React, { useState, useMemo, useEffect } from "react";

function OrdersTitle() {
	const [isLoaded, setIsLoaded] = useState(false);
	const word = "YOUR ORDERS";

	const delays = useMemo(
		() => [120, 380, 200, 480, 160, 260, 420, 180, 520, 310, 240],
		[],
	);

	useEffect(() => {
		const timer = setTimeout(() => {
			setIsLoaded(true);
		}, 800);

		return () => clearTimeout(timer);
	}, []);

	return (
		<div className="w-full px-4 md:px-6 pt-16 md:pt-16 select-none">
			<div className="w-full flex items-center justify-center overflow-hidden">
				<h1
					className="text-[13vw] font-black tracking-[-0.02em] leading-[0.80] uppercase text-[#EDE4DD] flex whitespace-nowrap"
					style={{
						fontFamily: "'Inter Tight', -apple-system, sans-serif",
					}}
				>
					{word.split("").map((char, index) => (
						<span
							key={index}
							className={`inline-block overflow-hidden ${
								char === " " ? "w-[0.3em]" : ""
							}`}
						>
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
								{char === " " ? "\u00A0" : char}
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

export default OrdersTitle;
