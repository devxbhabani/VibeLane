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
						className="mt-2 text-stone-300 text-[20px] tracking-wide"
						style={{
							fontFamily: "'Inter', -apple-system, sans-serif",
						}}
					>
						<p>{item.name}</p>
					</div>
				</div>
			))}
		</div>
	);
}

export default Lookgrid;
