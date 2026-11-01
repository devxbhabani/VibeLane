import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AppProvider, useApp } from "./context/AppContext";
import { ReactLenis } from "lenis/react";
import { Home } from "./pages/Home";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import { Navbar } from "./components/layout/Navbar";
import ProductDetail from "./pages/ProductDetail";
import NotFound from "./pages/NotFound";
import Bag from "./pages/Bag";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import VerifyOtp from "./pages/VerifyOtp";
import ScrollToTop from "./components/layout/ScrollToTop";
import { Footer } from "./components/layout/Footer";
import Account from "./pages/Account";
import Orders from "./pages/Orders";
import SplashScreen from "./components/layout/SplashScreen";
import RouteTransitionLoader from "./components/layout/RouteTransitionLoader";
import AdminRoute from "./components/auth/AdminRoute";
import AdminOrders from "./pages/AdminOrders";

function AppContent() {
	const { splashFinished, setSplashFinished } = useApp();

	return (
		<>
			<SplashScreen onComplete={() => setSplashFinished(true)} />

			<div className="app-container selection:bg-[#f31919dc] bg-black text-white">
				<Router>
					<RouteTransitionLoader />
					<ScrollToTop />
					<Navbar />
					<div
						className={`transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${
							splashFinished
								? "opacity-100 scale-100 translate-y-0"
								: "opacity-0 scale-[0.99] translate-y-2 pointer-events-none"
						}`}
					>
						<Routes>
							<Route exact path="/" element={<Home />} />
							<Route exact path="/privacy" element={<Privacy />} />
							<Route exact path="/terms" element={<Terms />} />
							<Route
								exact
								path="/products/:slug"
								element={<ProductDetail />}
							/>
							<Route exact path="/bag" element={<Bag />} />
							<Route exact path="/checkout" element={<Checkout />} />
							<Route exact path="/login" element={<Login />} />
							<Route exact path="/signup" element={<Signup />} />
							<Route exact path="/verify-otp" element={<VerifyOtp />} />
							<Route exact path="/account" element={<Account />} />
							<Route exact path="/orders" element={<Orders />} />
							<Route path="*" element={<NotFound />} />

							{/* ADMIN ROUTES */}
							<Route element={<AdminRoute />}>
								{/* <Route path="/admin" element={<AdminDashboard />} /> */}
								<Route path="/admin/orders" element={<AdminOrders />} />
							</Route>
						</Routes>
						<Footer />
					</div>
				</Router>
			</div>
		</>
	);
}

function App() {
	return (
		<ReactLenis
			root
			options={{
				lerp: 0.09,
				wheelMultiplier: 1.1,
				touchMultiplier: 1.5,
				smoothWheel: true,
			}}
		>
			<AppProvider>
				<AppContent />
			</AppProvider>
		</ReactLenis>
	);
}

export default App;
