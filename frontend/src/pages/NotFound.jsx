import React from "react";
import { Link } from "react-router-dom";

function NotFound() {
	return (
		<div className="min-h-screen flex flex-col items-center justify-center bg-black text-[#EDE4DD] px-6 text-center select-none">
			<span className="text-xs font-mono tracking-widest text-zinc-500 uppercase mb-4">
				Error 404 — Page Not Found
			</span>

			<h1
				className="text-8xl md:text-9xl font-black tracking-tighter uppercase leading-none mb-6"
				style={{ fontFamily: "'Inter Tight', -apple-system, sans-serif" }}
			>
				VOID
			</h1>

			<p className="max-w-md text-sm text-zinc-400 mb-8 font-mono">
				The destination or artifact you are requesting does not exist in
				this archive.
			</p>

			<Link
				to="/"
				className="px-6 py-2.5 text-xs font-mono uppercase tracking-widest border border-white/20 bg-white/5 hover:bg-[#EDE4DD] hover:text-black transition-all duration-300"
			>
				Return to Archive
			</Link>
		</div>
	);
}

export default NotFound;
