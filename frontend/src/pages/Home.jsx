import React, { useEffect, useState } from "react";
import { fetchHealth } from "../services/api";

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
		// <main className="flex-1 flex items-center justify-center px-6 py-20 bg-slate-900 text-slate-100">
		//   <section className="max-w-2xl mx-auto text-center space-y-6">
		//     <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
		//       <span>✨</span> Tailwind CSS v4 Active
		//     </div>
		//     <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight">
		//       Welcome to{' '}
		//       <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
		//         VibeLane
		//       </span>
		//     </h1>
		//     <p className="text-lg text-slate-400">
		//       Your next-generation lifestyle & e-commerce destination, powered by Vite, React 19, Express, and Tailwind CSS.
		//     </p>
		//     <div className="inline-block px-5 py-3 rounded-xl bg-slate-800/80 border border-slate-700 shadow-lg backdrop-blur-sm text-sm">
		//       Backend API Status:{' '}
		//       <strong className={apiStatus.includes('online') || apiStatus.includes('offline') ? 'text-amber-400' : 'text-emerald-400'}>
		//         {apiStatus}
		//       </strong>
		//     </div>
		//   </section>
		// </main>
		<></>
	);
};
