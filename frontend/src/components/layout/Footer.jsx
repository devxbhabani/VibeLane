import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export const Footer = () => {
	const [isLoaded, setIsLoaded] = useState(false);

	useEffect(() => {
		// Triggers shortly after mount/reload
		const timer = setTimeout(() => {
			setIsLoaded(true);
		}, 1000);

		return () => clearTimeout(timer);
	}, []);

	return (
		<>
			<div className="mx-8 mb-8">
				<div
					className={`w-full h-0.5 bg-[#EDE4DD] mt-10 mb-4 origin-left transition-transform duration-100 ease-[cubic-bezier(0.16,1,0.3,1)] ${
						isLoaded ? "scale-x-100" : "scale-x-0"
					}`}
				/>

				<div className="flex  justify-between gap-1">
					<div className="flex flex-col gap-1">
						<h1 className="text-3xl font-extrabold tracking-wide">
							VibeLane
						</h1>
						<h1 className="font-medium text-[16px]">©26</h1>
					</div>
					<div className="flex flex-col gap-1">
						<p className="font-semibold text-[13px]">
							Kolkata, West Bengal
						</p>
						<p className="font-medium text-[14px]">INDIA</p>
					</div>
					<div className="flex flex-col gap-1">
						<Link to="/privacy" className="font-medium text-[13px]">
							Privacy Policy
						</Link>
						<Link to="/terms" className="font-medium text-[13px]">
							Terms of Service
						</Link>
					</div>
					<div className="flex justify-between gap-15">
						<div className="flex flex-col gap-1">
							<a
								href="https://www.instagram.com/bsjana_07/"
								className="font-medium text-[13px]"
							>
								Instagram
							</a>
							<a
								href="https://www.linkedin.com/in/bhabanisankarjana"
								className="font-medium text-[13px]"
							>
								LinkedIn
							</a>
							<a
								href="https://github.com/devxbhabani"
								className="font-medium text-[13px]"
							>
								Github
							</a>
							<a
								href="https://x.com/bsjana_007"
								className="font-medium text-[13px]"
							>
								X
							</a>
						</div>
						<div>
							<div className="flex flex-col gap-1">
								<Link className="font-medium text-[13px]" to="/">
									Work
								</Link>
								<Link className="font-medium text-[13px]" to="/">
									Services
								</Link>
								<Link className="font-medium text-[13px]" to="/">
									About
								</Link>
								<Link className="font-medium text-[13px]" to="/">
									Careers
								</Link>
							</div>
						</div>
						<div>
							<a
								href="https://devxbhabani.vercel.app/"
								target="_blank"
								className="font-medium text-[13px]"
							>
								Contact
							</a>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};
