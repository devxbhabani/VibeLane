import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
	Scale,
	ShoppingBag,
	RotateCcw,
	Truck,
	ShieldAlert,
	Sparkles,
	Mail,
	FileText,
} from "lucide-react";

function Terms() {
	const [isLoaded, setIsLoaded] = useState(false);

	useEffect(() => {
		window.scrollTo(0, 0);
		const timer = setTimeout(() => {
			setIsLoaded(true);
		}, 100);
		return () => clearTimeout(timer);
	}, []);

	const sections = [
		{
			id: "01",
			title: "Agreement to Terms",
			icon: <Scale className="w-5 h-5 text-[#EDE4DD]/80" />,
			summary:
				"Legal binding between the client and VibeLane E-Commerce Studio.",
			details: [
				"By accessing the VibeLane digital storefront, enrolling in client authentication, or acquiring pieces from our collections, you agree to be bound by these Terms of Service.",
				"If you do not agree with any part of these protocols, you must discontinue platform engagement immediately.",
				"We reserve the right to revise, modernize, or amend these terms at our discretion to reflect regulatory requirements and evolving platform mechanics.",
			],
		},
		{
			id: "02",
			title: "Orders & Purchases",
			icon: <ShoppingBag className="w-5 h-5 text-[#EDE4DD]/80" />,
			summary:
				"Order placement, allocation, pricing integrity, and verification.",
			details: [
				"All piece allocations are subject to real-time inventory availability. Placing a piece in your bag does not guarantee reservation until checkout authorization is completed.",
				"Prices are quoted in USD/INR as displayed at checkout, exclusive of localized customs duties where applicable.",
				"VibeLane reserves the right to decline, cancel, or throttle any transaction suspected of botting, automated scraping, or commercial unauthorized resale.",
			],
		},
		{
			id: "03",
			title: "Dispatch & Logistics",
			icon: <Truck className="w-5 h-5 text-[#EDE4DD]/80" />,
			summary:
				"Secured delivery, tracking protocols, and courier obligations.",
			details: [
				"Orders undergo standard authentication verification prior to warehouse release. Standard dispatch takes 2-4 business days.",
				"Priority Air Express parcels are expedited under end-to-end tracked courier protocols with signature verification upon delivery.",
				"Title and risk of loss pass to the client once the parcel is handed over to the authorized carrier partner (DHL, FedEx, BlueDart).",
			],
		},
		{
			id: "04",
			title: "Returns & Exchanges",
			icon: <RotateCcw className="w-5 h-5 text-[#EDE4DD]/80" />,
			summary:
				"14-day archival inspection window and condition prerequisites.",
			details: [
				"Clients are granted a 14-day archival review window from the date of confirmed carrier delivery.",
				"Garments and accessories must remain in pristine, unworn condition with all original security tags, barcodes, and packaging intact.",
				"Limited edition or custom tailored archive drops may be marked as Final Sale, explicitly designated prior to purchase confirmation.",
			],
		},
		{
			id: "05",
			title: "Intellectual Property",
			icon: <FileText className="w-5 h-5 text-[#EDE4DD]/80" />,
			summary:
				"Protection of VibeLane designs, editorial media, and marks.",
			details: [
				"All visual artifacts, typography pairings, kinetic interactive code, lookbooks, photography, and garment silhouettes are the exclusive property of VibeLane Studio.",
				"Reproduction, redistribution, or reverse engineering of any digital or physical assets without express written consent is strictly prohibited.",
				"Unauthorized commercial usage of the VibeLane trademark or branding constitutes copyright and trademark infringement.",
			],
		},
		{
			id: "06",
			title: "Limitation of Liability",
			icon: <ShieldAlert className="w-5 h-5 text-[#EDE4DD]/80" />,
			summary:
				"Disclaimers of warranties and governing legal boundaries.",
			details: [
				"VibeLane provides its digital catalog and services on an 'as is' and 'as available' basis without warranties of uninterrupted uptime.",
				"Under no circumstance shall VibeLane be held liable for indirect, incidental, or consequential damages resulting from platform downtime or third-party carrier delays.",
				"These terms are governed by and construed under the legal jurisdiction of Kolkata, India, without regard to conflict of law principles.",
			],
		},
	];

	return (
		<div className="min-h-screen flex flex-col bg-black text-[#EDE4DD] selection:bg-[#f31919dc] selection:text-white">
			{/* Hero Banner with top padding for global transparent Navbar */}
			<main className="flex-1 w-full max-w-6xl mx-auto px-6 md:px-12 pt-28 md:pt-36 pb-16 md:pb-24">
				<div className="space-y-6">
					<div className="inline-flex items-center gap-2 px-3 py-1 text-[10px] font-mono uppercase tracking-widest text-[#EDE4DD] bg-white/5 border border-white/10 rounded-full">
						<Scale className="w-3.5 h-3.5 text-zinc-300" />
						<span>Legal Framework & Protocols</span>
					</div>

					<h1
						className="text-5xl md:text-7xl lg:text-8xl font-black tracking-[-0.03em] uppercase leading-[0.9] text-[#EDE4DD]"
						style={{
							fontFamily: "'Inter Tight', -apple-system, sans-serif",
						}}
					>
						Terms of <br />
						<span className="text-zinc-600">Service</span>
					</h1>

					<p className="max-w-2xl text-base md:text-lg text-zinc-400 font-normal leading-relaxed pt-2">
						These terms govern your access to the VibeLane digital studio,
						piece reservations, and client authentication protocols. Read
						carefully before acquisition.
					</p>

					<div
						className={`w-full h-0.5 bg-[#EDE4DD] mt-10 origin-left transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
							isLoaded ? "scale-x-100" : "scale-x-0"
						}`}
					/>
				</div>

				{/* Quick Metadata Info */}
				<div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-10 border-b border-white/10 text-xs font-mono uppercase tracking-wider text-zinc-400">
					<div>
						<span className="text-zinc-600 block mb-1">
							Effective Date
						</span>
						<span className="text-white font-medium">
							January 01, 2026
						</span>
					</div>
					<div>
						<span className="text-zinc-600 block mb-1">Jurisdiction</span>
						<span className="text-white font-medium">Kolkata, India</span>
					</div>
					<div>
						<span className="text-zinc-600 block mb-1">
							Entity
						</span>
						<span className="text-white font-medium">
							VibeLane Studio Pvt.
						</span>
					</div>
					<div>
						<span className="text-zinc-600 block mb-1">Legal Counsel</span>
						<span className="text-white font-medium">
							legal@vibelane.com
						</span>
					</div>
				</div>

				{/* Content Sections */}
				<div className="py-16 space-y-16">
					{sections.map((section) => (
						<article
							key={section.id}
							className="group grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12 items-start transition-all duration-300"
						>
							{/* Section Number & Meta */}
							<div className="md:col-span-4 flex items-start gap-4">
								<span className="text-2xl md:text-3xl font-mono font-bold text-zinc-700 group-hover:text-zinc-400 transition-colors">
									{section.id}
								</span>
								<div className="space-y-1">
									<div className="flex items-center gap-2">
										{section.icon}
										<h2 className="text-xl md:text-2xl font-bold tracking-tight text-white">
											{section.title}
										</h2>
									</div>
									<p className="text-xs text-zinc-500 font-mono">
										{section.summary}
									</p>
								</div>
							</div>

							{/* Section Content Details */}
							<div className="md:col-span-8 bg-[#101010] p-6 md:p-8 rounded-sm border border-white/5 space-y-4 hover:border-white/15 transition-all">
								<ul className="space-y-3">
									{section.details.map((point, idx) => (
										<li
											key={idx}
											className="flex items-start gap-3 text-sm md:text-base text-zinc-300 leading-relaxed"
										>
											<span className="w-1.5 h-1.5 rounded-full bg-zinc-600 mt-2.5 shrink-0" />
											<span>{point}</span>
										</li>
									))}
								</ul>
							</div>
						</article>
					))}
				</div>

				{/* Contact / Inquiries Box */}
				<div className="mt-12 p-8 md:p-10 rounded-sm bg-[#121212] border border-white/10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
					<div className="space-y-2">
						<h3 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
							<Mail className="w-5 h-5 text-[#EDE4DD]" />
							Require legal clarification or contract review?
						</h3>
						<p className="text-sm text-zinc-400 max-w-xl">
							For inquiries regarding our terms, commercial wholesale
							protocols, or intellectual property rights, reach our legal
							desk.
						</p>
					</div>

					<a
						href="mailto:legal@vibelane.com"
						className="px-6 py-3 text-xs uppercase tracking-widest font-mono font-semibold bg-[#EDE4DD] text-black hover:bg-white transition-colors rounded-xs whitespace-nowrap"
					>
						Contact Legal Desk
					</a>
				</div>
			</main>
		</div>
	);
}

export default Terms;
