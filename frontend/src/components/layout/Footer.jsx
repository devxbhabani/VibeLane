import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Manifesto from "./Manifesto";

export const Footer = () => {
	const [isLoaded, setIsLoaded] = useState(false);

	useEffect(() => {
		// Triggers shortly after mount/reload
		const timer = setTimeout(() => {
			setIsLoaded(true);
		}, 1000);

		return () => clearTimeout(timer);
	}, []);

	const linkHover =
		"font-medium text-[13px] relative inline-block w-fit leading-normal text-white transition-colors duration-300 after:content-[''] after:absolute after:left-0 after:-bottom-0.5 after:h-[2px] after:w-0 after:bg-[#EDE4DD] after:transition-all after:duration-300 hover:after:w-full";

	return (
		<>
			<Manifesto />
			<div className="mx-8 pb-8">
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
						<Link to="/privacy" className={linkHover}>
							Privacy Policy
						</Link>
						<Link to="/terms" className={linkHover}>
							Terms of Service
						</Link>
					</div>
					<div className="flex justify-between gap-15">
						<div className="flex flex-col gap-1">
							<a
								href="https://www.instagram.com/bsjana_07/"
								className={linkHover}
							>
								Instagram
							</a>
							<a
								href="https://www.linkedin.com/in/bhabanisankarjana"
								className={linkHover}
							>
								LinkedIn
							</a>
							<a
								href="https://github.com/devxbhabani"
								className={linkHover}
							>
								Github
							</a>
							<a href="https://x.com/bsjana_007" className={linkHover}>
								X
							</a>
						</div>
						<div>
							<div className="flex flex-col gap-1">
								<Link className={linkHover} to="/">
									Work
								</Link>
								<Link className={linkHover} to="/">
									Services
								</Link>
								<Link className={linkHover} to="/">
									About
								</Link>
								<Link className={linkHover} to="/">
									Careers
								</Link>
							</div>
						</div>
						<div>
							<a
								href="https://devxbhabani.vercel.app/"
								target="_blank"
								className={linkHover}
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
