import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
	ArrowLeft,
	ShieldCheck,
	Lock,
	Eye,
	FileText,
	Sparkles,
	Mail,
} from "lucide-react";
import { Footer } from "../components/layout/Footer";

function Privacy() {
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
			title: "Information We Collect",
			icon: <Eye className="w-5 h-5 text-[#EDE4DD]/80" />,
			summary:
				"Data required to curate and fulfill your day-to-day fashion pieces.",
			details: [
				"Personal details you provide when placing an order (name, shipping address, contact details, email).",
				"Transactional information processed securely via PCI-compliant payment gateways. We never store raw payment card data on our servers.",
				"Device and browsing telemetry (approximate geographic area, browser type, referrer URLs) used solely to enhance browsing performance and storefront responsiveness.",
			],
		},
		{
			id: "02",
			title: "How We Use Your Data",
			icon: <FileText className="w-5 h-5 text-[#EDE4DD]/80" />,
			summary:
				"Purely to deliver high-quality apparel and frictionless shopping.",
			details: [
				"Order processing, fulfillment, and real-time shipment updates.",
				"Personalized aesthetic discovery and product recommendations based on seasonal lookbooks.",
				"Direct client communication regarding order status, return authorizations, or security notices.",
				"Preventing fraudulent activity and protecting the integrity of our platform.",
			],
		},
		{
			id: "03",
			title: "Security & Safeguards",
			icon: <Lock className="w-5 h-5 text-[#EDE4DD]/80" />,
			summary: "Enterprise-grade encryption and strict access limitations.",
			details: [
				"All transmissions to and from VibeLane are protected with modern TLS 1.3 encryption protocols.",
				"Access to order logs is restricted to authorized personnel under least-privilege principles.",
				"Routine automated security scans to protect against vulnerabilities and unauthorized intrusions.",
			],
		},
		{
			id: "04",
			title: "Third-Party Disclosures",
			icon: <ShieldCheck className="w-5 h-5 text-[#EDE4DD]/80" />,
			summary: "We never sell, rent, or trade your personal data. Period.",
			details: [
				"We collaborate only with vetted logistics carriers (DHL, BlueDart, FedEx) solely for parcel delivery.",
				"Trusted payment providers process transactions under strict confidentiality and international compliance standards.",
				"We do not sell customer lists to third-party ad brokers or data aggregators.",
			],
		},
		{
			id: "05",
			title: "Your Rights & Controls",
			icon: <Sparkles className="w-5 h-5 text-[#EDE4DD]/80" />,
			summary:
				"Complete authority over your identity and digital footprint.",
			details: [
				"Request a full copy of the personal information stored in your profile at any time.",
				"Request immediate rectification or permanent erasure of your user data (Right to be Forgotten).",
				"Opt-out of promotional communications instantly with single-click unsubscribe links.",
			],
		},
	];

	return (
		<div className="min-h-screen flex flex-col bg-black text-[#EDE4DD] selection:bg-[#f31919dc] selection:text-white">
			{/* Header Navigation Bar */}
			<header className="w-full px-6 md:px-12 pt-8 pb-6 flex items-center justify-between border-b border-white/10 backdrop-blur-md sticky top-0 z-30 bg-black/80">
				<Link
					to="/"
					className="group inline-flex items-center gap-2 text-xs uppercase tracking-widest font-mono text-zinc-400 hover:text-white transition-colors"
				>
					<ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
					<span>Back to Lookbook</span>
				</Link>

				<Link
					to="/"
					className="text-2xl font-black tracking-tighter uppercase text-[#EDE4DD] hover:opacity-80 transition-opacity"
				>
					VibeLane
				</Link>

				<div className="text-xs font-mono text-zinc-500 uppercase tracking-widest hidden sm:block">
					Legal / Rev. 2026
				</div>
			</header>

			{/* Hero Banner */}
			<main className="flex-1 w-full max-w-6xl mx-auto px-6 md:px-12 py-16 md:py-24">
				<div className="space-y-6">
					<div className="inline-flex items-center gap-2 px-3 py-1 text-[10px] font-mono uppercase tracking-widest text-[#EDE4DD] bg-white/5 border border-white/10 rounded-full">
						<ShieldCheck className="w-3.5 h-3.5 text-zinc-300" />
						<span>Transparency & Trust</span>
					</div>

					<h1
						className="text-5xl md:text-7xl lg:text-8xl font-black tracking-[-0.03em] uppercase leading-[0.9] text-[#EDE4DD]"
						style={{
							fontFamily: "'Inter Tight', -apple-system, sans-serif",
						}}
					>
						Privacy <br />
						<span className="text-zinc-600">Policy</span>
					</h1>

					<p className="max-w-2xl text-base md:text-lg text-zinc-400 font-normal leading-relaxed pt-2">
						At VibeLane, your privacy is as curated as our garments. We
						honor your trust by securing your data with uncompromising
						standards and absolute transparency.
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
							Data Controller
						</span>
						<span className="text-white font-medium">
							VibeLane Studio
						</span>
					</div>
					<div>
						<span className="text-zinc-600 block mb-1">Inquiries</span>
						<span className="text-white font-medium">
							support@vibelane.com
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
							Have questions regarding your privacy?
						</h3>
						<p className="text-sm text-zinc-400 max-w-xl">
							Reach out to our Data Privacy Officer directly. We respond
							to all data inquiries and deletion requests within 48
							business hours.
						</p>
					</div>

					<a
						href="mailto:support@vibelane.com"
						className="px-6 py-3 text-xs uppercase tracking-widest font-mono font-semibold bg-[#EDE4DD] text-black hover:bg-white transition-colors rounded-xs whitespace-nowrap"
					>
						Contact Privacy Team
					</a>
				</div>
			</main>

			{/* Global Unified Footer */}
			<Footer />
		</div>
	);
}

export default Privacy;
