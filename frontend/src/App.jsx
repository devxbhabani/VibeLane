import React from "react";
import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";
import { Home } from "./pages/Home";
import { AppProvider } from "./context/AppContext";
import HeroTitle from "./components/hero/HeroTitle";
import Lookgrid from "./components/lookbook/Lookgrid";
import { ReactLenis } from "lenis/react";

function App() {
	return (
		<ReactLenis
			root
			options={{
				lerp: 0.1, // Adjust this to make it more or less smooth (lower = smoother/slower)
				duration: 1.5,
				smoothWheel: true,
			}}
		>
			<div className="app-container">
				<AppProvider>
					<div className="min-h-screen flex flex-col bg-black text-white selection:bg-[#FF0001] selection:text-white">
						{/* <Navbar />
						<Home />
						<Footer /> */}
						<HeroTitle />
						<Lookgrid />
					</div>
				</AppProvider>
			</div>
		</ReactLenis>
	);
}

export default App;
