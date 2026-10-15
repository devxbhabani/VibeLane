import React, { useEffect, useMemo, useState } from "react";
import { ArrowLeft, Minus, Plus } from "lucide-react";
import useProducts from "../hooks/useProducts";
import { useParams } from "react-router-dom";

function ProductDetail() {
	const { slug } = useParams();
	const { products, loading: contextLoading } = useProducts();
	const [selectedSize, setSelectedSize] = useState("M");
	const [productCount, setProductCount] = useState(1);

	const product = useMemo(() => {
		return products.find((p) => p.slug === slug || String(p.id) === slug);
	}, [products, slug]);

	useEffect(() => {
		window.scrollTo({ top: 0, left: 0, behavior: "instant" });
	}, [slug]);

	if (contextLoading) {
		return (
			<div className="text-center py-24 text-xs font-mono tracking-widest text-[#EDE4DD]/60">
				INITIALIZING PRODUCT ARCHIVE...
			</div>
		);
	}
	if (!product) {
		return (
			<div className="text-white p-10 font-mono">
				<p>PRODUCT NOT FOUND</p>
				<Link to="/" className="underline mt-4 block">
					Return to Archive
				</Link>
			</div>
		);
	}

	return (
		<div className="pt-20 px-8 md:px-12 flex justify-between gap-5 items-start w-full min-h-screen">
			<div className="w-[50%] sticky top-28 self-start">
				<p
					onClick={() => window.history.back()}
					className="flex items-center gap-2 text-[14px] font-semibold mb-4 relative font-mono  tracking-widest text-[#EDE4DD]/70 hover:text-[#EDE4DD] cursor-pointer"
				>
					<ArrowLeft className="w-4 h-4" />
					Back to Archive
				</p>
				<h1 className="text-6xl text-[#EDE4DD] tracking-tight md:text-6xl font-semibold mb-6">
					{product.name}
				</h1>
				<p className="text-3xl font-bold text-[#EDE4DD] mb-4">
					${product.price}
				</p>
				<p className="mt-2 text-[20px] text-base text-zinc-300 font-medium leading-relaxed">
					{product.description}
				</p>
				<div className="mr-5">
					{product.sizes && product.sizes.length > 0 && (
						<div className="mt-6 pb-3 border-b-2 border-white/70 flex items-center justify-between">
							<span className="text-xl font-medium text-white">
								Size
							</span>
							<div className="flex items-center gap-6">
								{product.sizes.map((size) => {
									const isSelected = selectedSize === size;
									return (
										<button
											key={size}
											type="button"
											onClick={() => setSelectedSize(size)}
											className={`text-lg transition-colors cursor-pointer ${isSelected ? "text-white font-bold underline underline-offset-4" : "text-zinc-400 hover:text-zinc-300 font-normal"}`}
										>
											{size}
										</button>
									);
								})}
							</div>
						</div>
					)}
				</div>
				{/* <div className="mt-8 pb-3 border-b-2 border-white/70 flex">
					<Minus
						className="text-lg"
						onClick={() => setProductCount(productCount - 1)}
					/>
					<p className="text-lg">{productCount}</p>
					<Plus
						className="text-lg"
						onClick={() => setProductCount(productCount + 1)}
					/>
				</div> */}
				<div className="mr-5 mt-6 pb-3 border-b-2 border-white/70 flex items-center justify-between select-none">
					<span className="text-xl font-medium text-white">Quantity</span>

					<div className="flex items-center gap-5">
						{/* Minus Button */}
						<button
							type="button"
							disabled={productCount <= 1}
							onClick={() =>
								setProductCount((prev) => Math.max(1, prev - 1))
							}
							className={`p-1 text-[#EDE4DD] transition-all duration-200 cursor-pointer ${
								productCount <= 1
									? "opacity-30 cursor-not-allowed"
									: "hover:text-white hover:scale-110 active:scale-95"
							}`}
							aria-label="Decrease quantity"
						>
							<Minus className="w-4 h-4" />
						</button>

						{/* Numeric Counter */}
						<span className="text-lg font-mono font-bold text-[#EDE4DD] w-6 text-center tabular-nums">
							{productCount}
						</span>

						{/* Plus Button */}
						<button
							type="button"
							disabled={productCount >= (product.stockQuantity || 20)}
							onClick={() =>
								setProductCount((prev) =>
									Math.min(product.stockQuantity || 20, prev + 1),
								)
							}
							className="p-1 text-[#EDE4DD] hover:text-white hover:scale-110 active:scale-95 transition-all duration-200 cursor-pointer"
							aria-label="Increase quantity"
						>
							<Plus className="w-4 h-4" />
						</button>
					</div>
				</div>
				{/* <div className="mt-3 mr-5">
					<button className="bg-white text-black w-full h-12 font-bold cursor-pointer tracking-wide">
						Add to Bag
					</button>
				</div> */}
				<div className="mt-8 mr-5">
					<button
						type="button"
						className="w-full h-13 bg-[#EDE4DD] hover:bg-white text-black uppercase tracking-widest text-xs font-bold transition-all duration-300 active:scale-[0.99] cursor-pointer flex items-center justify-center gap-2"
					>
						<span>Add to Bag</span>
						<span className="text-[11px] text-zinc-600 font-medium">
							— ${(product.price * productCount).toFixed(2)}
						</span>
					</button>
				</div>
			</div>
			<div className="w-[50%] flex flex-col gap-4 ">
				<img
					src={product.primaryImage}
					alt={`${product.name} front view`}
					className="w-full aspect4/5 object-cover rounded-xs shadow-xl"
				/>
				<img
					src={product.hoverImage}
					alt={`${product.name} alternate view`}
					className="w-full aspect-4/5 object-cover rounded-xs shadow-xl" //h-[80%]
				/>
			</div>
		</div>
	);
}

export default ProductDetail;
