import React, { useState, useEffect } from "react";
import BagTitle from "../components/hero/BagTitle";

// Reusable helper to animate text character-by-character
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

function Bag() {
	const [isLoaded, setIsLoaded] = useState(false);

	useEffect(() => {
		// Starts smoothly right as the page loads or right after YOUR BAG animates
		const timer = setTimeout(() => {
			setIsLoaded(true);
		}, 1100);

		return () => clearTimeout(timer);
	}, []);

	return (
		<div className="h-screen">
			<BagTitle />
			<div className="w-screen px-6 pt-18 ">
				<div className="flex justify-between items-center">
					<div className="flex flex-col gap-3">
						{/* Line 1: Not a Single Piece? */}
						<AnimatedText
							text="Not a Single Piece?"
							isLoaded={isLoaded}
							baseDelay={100}
							className="text-9xl font-extrabold flex flex-wrap"
							style={{
								fontFamily: "'Inter Tight', -apple-system, sans-serif",
							}}
						/>

						{/* Line 2: That Hurts. (Starts slightly after Line 1) */}
						<AnimatedText
							text="That Hurts."
							isLoaded={isLoaded}
							baseDelay={650}
							className="text-9xl text-zinc-500 font-extrabold flex flex-wrap"
							style={{
								fontFamily: "'Inter Tight', -apple-system, sans-serif",
							}}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Bag;
