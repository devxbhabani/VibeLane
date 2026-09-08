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
		<div className="grid grid-cols-1 m-8 mt-25 md:grid-cols-4 gap-8">
			{products.map((item) => (
				<div key={item._id} className="">
					<div className="group relative aspect-9/12">
						<img
							src={item.primaryImage}
							alt={item.name}
							className="absolute inset-0 w-full h-full object-cover group-hover:opacity-0 transition-opacity"
						/>
						<img
							src={item.hoverImage}
							alt={item.name}
							className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity"
						/>
					</div>
					<div
						className="mt-2.5 flex flex-col select-none"
						style={{
							fontFamily: "'Inter Tight', -apple-system, sans-serif",
						}}
					>
						<div className="flex justify-between items-baseline text-[18px] md:text-[18px] text-[#EDE4DD] font-normal tracking-[-0.01em]">
							<span className="truncate pr-2">{item.name}</span>
							<span className="shrink-0 font-normal">
								${Number(item.price).toFixed(2)}
							</span>
						</div>
						<div className="flex items-center gap-1.5 mt-0.5 text-[9px] md:text-[10px] text-[#EDE4DD]/70 uppercase tracking-widest font-medium">
							<span className="inline-block w-1.5 h-1.5 rounded-full bg-[#EDE4DD]" />
							<span>{item.category || "APPAREL"}</span>
						</div>
					</div>
				</div>
			))}
		</div>
	);
}

export default Lookgrid;
