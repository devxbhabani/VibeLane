import React from "react";
import useProducts from "../../hooks/useProducts";

function Lookgrid() {
	const { products, loading, error } = useProducts();
	if (loading) {
		return (
			<div className="text-center py-20 text-xs font-mono text-neutral-500">
				Loading Collection...
			</div>
		);
	}
	if (error) {
		return (
			<div className="text-center py-20 text-xs font-mono text-red-500">
				Error: {error}
			</div>
		);
	}
	return (
		<div className="grid grid-cols-1 m-8 mt-25 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
			{products.map((item) => (
				<div key={item._id || item.itemNumber || item.slug} className="flex flex-col">
					<div className="group relative aspect-[3/4] overflow-hidden bg-[#141414] rounded-sm cursor-pointer select-none">
						{item.badge && (
							<div className="absolute top-3 left-3 z-10 px-2.5 py-1 text-[9px] uppercase tracking-widest font-mono font-medium text-[#EDE4DD] bg-black/55 backdrop-blur-md border border-white/10 rounded-xs pointer-events-none transition-opacity duration-300">
								{item.badge}
							</div>
						)}
						{item.itemNumber && (
							<div className="absolute top-3 right-3 z-10 text-[10px] font-mono text-[#EDE4DD]/50 pointer-events-none">
								#{item.itemNumber}
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
						className="mt-3 flex flex-col select-none"
						style={{
							fontFamily: "'Inter Tight', -apple-system, sans-serif",
						}}
					>
						<div className="flex justify-between items-baseline text-[17px] text-[#EDE4DD] font-normal tracking-[-0.01em]">
							<span className="truncate pr-2 hover:underline cursor-pointer">{item.name}</span>
							<span className="shrink-0 font-medium">
								${Number(item.price).toFixed(2)}
							</span>
						</div>
						<div className="flex items-center gap-1.5 mt-0.5 text-[9px] md:text-[10px] text-[#EDE4DD]/60 uppercase tracking-widest font-medium">
							<span className="inline-block w-1.5 h-1.5 rounded-full bg-[#EDE4DD]/80" />
							<span>{item.category || "APPAREL"}</span>
						</div>
					</div>
				</div>
			))}
		</div>
	);
}

export default Lookgrid;
