import React, { useState, useMemo } from "react";
import useProducts from "../../hooks/useProducts";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

function Lookgrid() {
	const navigate = useNavigate();
	const { products, loading, error } = useProducts();
	const [activeCategory, setActiveCategory] = useState("All");

	const categories = useMemo(() => {
		if (!products || products.length === 0) return ["All"];
		const set = new Set(products.map((p) => p.category).filter(Boolean));
		return ["All", ...Array.from(set)];
	}, [products]);

	const filteredProducts = useMemo(() => {
		if (!products) return [];
		if (activeCategory === "All") return products;
		return products.filter((p) => p.category === activeCategory);
	}, [products, activeCategory]);

	if (loading) {
		return (
			<div className="text-center py-24 text-xs font-mono tracking-widest text-[#EDE4DD]/60">
				INITIALIZING CATALOG ARCHIVE...
			</div>
		);
	}
	if (error) {
		return (
			<div className="text-center py-24 text-xs font-mono text-red-400">
				Error loading archive: {error}
			</div>
		);
	}

	const linkHover =
		"cursor-pointer font-medium relative inline-block w-fit leading-normal text-white transition-colors duration-300 after:content-[''] after:absolute after:left-0 after:-bottom-0.5 after:h-[2px] after:w-0 after:bg-[#EDE4DD] after:transition-all after:duration-300 hover:after:w-full group-hover:after:w-full";

	return (
		<div id="lookbook" className="mx-6 md:mx-10 mt-14 mb-24 scroll-mt-24">
			{/* Category Filter Pills */}
			<div className="flex flex-wrap items-center gap-2 mb-10 pb-4 border-b border-white/10 select-none">
				{categories.map((cat) => {
					const count =
						cat === "All"
							? products.length
							: products.filter((p) => p.category === cat).length;
					const isActive = activeCategory === cat;
					return (
						<button
							key={cat}
							onClick={() => setActiveCategory(cat)}
							className={`px-3.5 py-1.5 rounded-xs text-[11px] font-mono tracking-wider uppercase transition-all duration-200 cursor-pointer ${
								isActive
									? "bg-[#EDE4DD] text-black font-semibold shadow-sm"
									: "text-[#EDE4DD]/70 hover:text-[#EDE4DD] hover:bg-white/5 border border-white/10"
							}`}
						>
							{cat}{" "}
							<span
								className={`text-[9px] ml-1 ${isActive ? "text-black/60" : "text-[#EDE4DD]/40"}`}
							>
								({count})
							</span>
						</button>
					);
				})}
			</div>

			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 md:gap-y-20">
				{filteredProducts.map((item, index) => {
					// Asymmetrical grid pattern
					const getGridStyle = (i) => {
						const patterns = [
							{
								span: "md:col-span-2 md:row-span-2",
								aspect: "aspect-[3/4] md:aspect-auto md:h-full",
								margin: "", // First item, large, no top margin
							},
							{
								span: "md:col-span-1",
								aspect: "aspect-[3/4]",
								margin: "md:mt-16", // Pushed down slightly for stagger effect
							},
							{
								span: "md:col-span-1",
								aspect: "aspect-[3/4]",
								margin: "md:mt-32", // Pushed down even more for stagger effect
							},
							{
								span: "md:col-span-1",
								aspect: "aspect-[3/4]",
								margin: "",
							},
							{
								span: "md:col-span-1",
								aspect: "aspect-[3/4]",
								margin: "md:mt-12",
							},
							{
								span: "md:col-span-2 md:row-span-1",
								aspect: "aspect-[3/4] md:aspect-[16/9]",
								margin: "",
							},
							{
								span: "md:col-span-1",
								aspect: "aspect-[3/4]",
								margin: "",
							},
							{
								span: "md:col-span-1",
								aspect: "aspect-[3/4]",
								margin: "md:mt-16",
							},
							{
								span: "md:col-span-1",
								aspect: "aspect-[9/16]",
								margin: "md:mt-24", // 9th item (Left side, pushed down to center it)
							},
							{
								span: "md:col-span-2",
								aspect: "aspect-[2/4] md:aspect-auto md:h-full",
								margin: "", // 10th item (Huge center piece, takes 2 columns)
							},
							{
								span: "md:col-span-1",
								aspect: "aspect-[3/4]",
								margin: "md:mt-24", // 11th item (Right side, pushed down to match the left)
							},
							{
								span: "md:col-span-1 md:row-span-1",
								aspect: "aspect-[3/4] ",
								margin: "", // First item, large, no top margin
							},
							{
								span: "md:col-span-1",
								aspect: "aspect-[3/4]",
								margin: "md:mt-16", // Pushed down slightly for stagger effect
							},
							{
								span: "md:col-span-1",
								aspect: "aspect-[3/4]",
								margin: "md:mt-32", // Pushed down even more for stagger effect
							},
							{
								span: "md:col-span-2 md:row-span-2",
								aspect: "aspect-[3/4] ",
								margin: "",
							},
							{
								span: "md:col-span-1 md:row-span-2",
								aspect: "aspect-[3/4]",
								margin: "justify-end", // Spans 2 rows and pushes content to the bottom
								grow: false, // Prevents the image from stretching to fill the 2 rows
							},
						];
						return patterns[i % patterns.length];
					};
					const style = getGridStyle(index);

					return (
						<motion.div
							key={item._id || item.itemNumber || item.slug}
							className={`group flex flex-col cursor-pointer ${style.span} ${style.margin}`}
							initial={{ opacity: 0, y: 50 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true, margin: "-100px" }}
							transition={{ duration: 0.9, ease: "easeOut" }} // Smooth timing
							onClick={() => navigate(`/products/${item.slug}`)}
						>
							<div
								className={`relative overflow-hidden bg-[#141414] rounded-sm select-none ${style.grow === false ? "flex-none" : "grow"} ${style.aspect}`}
							>
								{item.badge && (
									<div className="absolute top-3 left-3 z-10 px-2.5 py-1 text-[9px] uppercase tracking-widest font-mono font-medium text-[#EDE4DD] bg-black/55 backdrop-blur-md border border-white/10 rounded-xs pointer-events-none transition-opacity duration-300">
										{item.badge}
									</div>
								)}
								{item.itemNumber && (
									<div className="absolute top-3 right-3 z-10 text-[10px] font-mono text-[#EDE4DD]/50 pointer-events-none">
										{/* #{item.itemNumber} */}
									</div>
								)}
								<img
									src={item.primaryImage}
									alt={item.name}
									loading="lazy"
									className="absolute inset-0 w-full h-full object-cover group-hover:opacity-0 transition-all duration-500 ease-out group-hover:scale-105"
								/>
								<img
									src={item.hoverImage}
									alt={`${item.name} alternate perspective`}
									loading="lazy"
									className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out scale-102 group-hover:scale-100"
								/>
							</div>
							<div
								className="mt-4 flex flex-col select-none shrink-0"
								style={{
									fontFamily:
										"'Inter Tight', -apple-system, sans-serif",
								}}
							>
								<div className="flex justify-between items-baseline text-[17px] text-[#EDE4DD] font-normal tracking-[-0.01em]">
									<div className="min-w-0 pr-2">
										<span className={linkHover}>{item.name}</span>
									</div>
									<span className="shrink-0 font-medium">
										${Number(item.price).toFixed(2)}
									</span>
								</div>
								<div className="flex items-center gap-1.5 mt-1 text-[9px] md:text-[10px] text-[#EDE4DD]/60 uppercase tracking-widest font-medium">
									<span className="inline-block w-1.5 h-1.5 rounded-full bg-[#EDE4DD]/80" />
									<span>{item.category || "APPAREL"}</span>
								</div>
							</div>
						</motion.div>
					);
				})}
			</div>
		</div>
	);
}

export default Lookgrid;
