import React from "react";
import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";
import { Home } from "./pages/Home";
import { AppProvider } from "./context/AppContext";
import HeroTitle from "./components/hero/HeroTitle";
import Lookgrid from "./components/lookbook/Lookgrid";

function App() {
	return (
		<AppProvider>
			<div className="min-h-screen flex flex-col bg-black text-white selection:bg-[#FF0001] selection:text-white">
				{/* <Navbar />
				<Home />
				<Footer /> */}
				<HeroTitle />
				<Lookgrid />
			</div>
		</AppProvider>
	);
}

export default App;
