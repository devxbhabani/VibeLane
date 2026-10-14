import React, { useEffect, useState } from "react";
import { fetchHealth } from "../services/api";
import HeroTitle from "../components/hero/HeroTitle";
import Lookgrid from "../components/lookbook/Lookgrid";
import { Footer } from "../components/layout/Footer";
import Manifesto from "../components/layout/Manifesto";

export const Home = () => {
	const [apiStatus, setApiStatus] = useState("Checking connection...");

	useEffect(() => {
		fetchHealth()
			.then((data) =>
				setApiStatus(data.message || "API connected successfully!"),
			)
			.catch(() => setApiStatus("Backend not connected or offline"));
	}, []);

	return (
		<>
			<div className="min-h-screen flex flex-col bg-black text-white selection:bg-[#f31919dc] selection:text-white">
				{/* <Navbar />
						<Home />
						<Footer /> */}
				<HeroTitle />
				<Lookgrid />
				<Manifesto />
				<Footer />
			</div>
		</>
	);
};
