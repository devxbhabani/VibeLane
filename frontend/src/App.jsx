import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import { ReactLenis } from "lenis/react";
import { Home } from "./pages/Home";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import { Navbar } from "./components/layout/Navbar";

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
					<Router>
						<Navbar />
						<Routes>
							<Route exact path="/" element={<Home />} />
							<Route exact path="/privacy" element={<Privacy />} />
							<Route exact path="/terms" element={<Terms />} />
						</Routes>
					</Router>
				</AppProvider>
			</div>
		</ReactLenis>
	);
}

export default App;
