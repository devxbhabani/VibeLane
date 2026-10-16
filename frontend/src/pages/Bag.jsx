import React, { useState, useEffect } from "react";
import BagTitle from "../components/hero/BagTitle";
import { useApp } from "../context/AppContext";
import { Link, useNavigate } from "react-router-dom";
import { Trash2 } from "lucide-react";

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
	const navigate = useNavigate();
	const { cart, removeFromCart } = useApp();
	const [isLoaded, setIsLoaded] = useState(false);

	const subtotal = cart.reduce(
		(sum, item) => sum + item.price * item.quantity,
		0,
	);

	useEffect(() => {
		// Starts smoothly right as the page loads or right after YOUR BAG animates
		const timer = setTimeout(() => {
			setIsLoaded(true);
		}, 1100);

		return () => clearTimeout(timer);
	}, []);

	return (
		<div className="min-h-screen overflow-x:hidden">
			<BagTitle />
			<div className="w-full px-6 pt-18 ">
				{cart.length === 0 ? (
					<div className="flex justify-between items-center">
						<div className="flex flex-col gap-3">
							<AnimatedText
								text="Not a Single Piece?"
								isLoaded={isLoaded}
								baseDelay={100}
								className="text-9xl font-extrabold flex flex-wrap"
								style={{
									fontFamily:
										"'Inter Tight', -apple-system, sans-serif",
								}}
							/>

							<AnimatedText
								text="That Hurts."
								isLoaded={isLoaded}
								baseDelay={650}
								className="text-9xl text-zinc-500 font-extrabold flex flex-wrap"
								style={{
									fontFamily:
										"'Inter Tight', -apple-system, sans-serif",
								}}
							/>
						</div>
					</div>
				) : (
					<div className="flex flex-col lg:flex-row justify-between gap-16 pt-8">
						{/* Left: List of Cart Items */}
						<div className="w-full lg:w-[60%] flex flex-col divide-y divide-white/10">
							{cart.map((item, idx) => (
								<div
									key={item.cartItemId}
									className={`py-6 flex items-center justify-between gap-6 transition-all duration-1400 ease-[cubic-bezier(0.16,1,0.3,1)] ${
										isLoaded
											? "translate-y-0 opacity-100"
											: "translate-y-14 opacity-0"
									}`}
									style={{
										transitionDelay: `${200 + idx * 160}ms`,
									}}
								>
									{/* Thumbnail & Info */}
									<div
										className="flex items-center gap-6 cursor-pointer"
										onClick={() => navigate(`/products/${item.slug}`)}
									>
										<img
											onClick={() =>
												navigate(`/products/${item.slug}`)
											}
											src={item.primaryImage}
											alt={item.name}
											className="w-20 h-24 object-cover rounded-xs bg-[#141414]"
										/>
										<div>
											<h3 className="text-xl font-bold uppercase tracking-tight">
												{item.name}
											</h3>
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
									{/* Price & Remove */}
									<div className="flex items-center gap-6">
										<span className=" text-lg font-bold">
											${(item.price * item.quantity).toFixed(2)}
										</span>
										<button
											onClick={() => removeFromCart(item.cartItemId)}
											className="text-zinc-500 hover:text-red-400 transition-colors cursor-pointer"
										>
											<Trash2 className="w-4 h-4" />
										</button>
									</div>
								</div>
							))}
						</div>
						{/* Right: Checkout Summary */}
						<div
							className={`w-full lg:w-[35%] border border-white/15 p-8 self-start sticky top-28 bg-black/60 backdrop-blur-md transition-all duration-1400 ease-[cubic-bezier(0.16,1,0.3,1)] ${
								isLoaded
									? "translate-y-0 opacity-100"
									: "translate-y-14 opacity-0"
							}`}
							style={{
								transitionDelay: `${300 + cart.length * 120}ms`,
							}}
						>
							<h2 className="font-mono text-xs uppercase tracking-widest text-zinc-400 mb-6">
								Summary
							</h2>
							<div className="flex justify-between  text-lg font-bold pb-4 border-b border-white/10">
								<span className="font-mono">SUBTOTAL</span>
								<span>${subtotal.toFixed(2)}</span>
							</div>
							<button
								type="button"
								className="mt-6 w-full py-4 bg-[#EDE4DD] hover:bg-white text-black font-mono uppercase tracking-widest text-xs font-bold transition-all duration-300 cursor-pointer"
							>
								Proceed to Checkout
							</button>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}

export default Bag;
